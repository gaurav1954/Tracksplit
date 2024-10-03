// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');
const Expense = require('../models/Expense');

exports.splitExpenseBetweenFriends = async (req, res) => {
    try {
        const { friendId, totalAmount, description, category } = req.body;
        const payerPhoneNumber = res.locals.jwtData.phoneNumber; // Using phone number from JWT data

        // Ensure both users exist
        const payer = await User.findOne({ phoneNumber: payerPhoneNumber });
        const friend = await User.findById(friendId);

        if (!payer || !friend) {
            return res.status(404).json({ message: 'Both payer and friend must exist.' });
        }

        // Calculate the split amount
        const splitAmount = totalAmount / 2;

        // Create new expense in the database
        const expense = new Expense({
            description,
            amount: totalAmount,
            category,
            paidBy: payer._id,
            splitBetween: [payer._id, friend._id],
        });

        // Save the new expense
        await expense.save();

        // Update balances
        payer.balance += splitAmount; // Payer receives this amount
        friend.balance -= splitAmount; // Friend owes this amount

        // Update debts
        payer.debts[friendId] = (payer.debts[friendId] || 0) + splitAmount;
        friend.debts[payer._id] = (friend.debts[payer._id] || 0) - splitAmount;

        // Save the updated user data
        await payer.save();
        await friend.save();

        return res.status(200).json({
            message: `Expense of ${totalAmount} split successfully`,
            expense,
            data: {
                payer: payer.username,
                friend: friend.username,
                amountOwed: splitAmount,
            },
        });
    } catch (error) {
        console.error('Error splitting expense:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.splitGroupExpense = async (req, res) => {
    try {
        const { groupId, totalAmount, description, category } = req.body;
        const payerPhoneNumber = res.locals.jwtData.phoneNumber; // Using phone number from JWT

        // Find the group
        const group = await Group.findById(groupId).populate('members');

        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }

        // Find the payer
        const payer = await User.findOne({ phoneNumber: payerPhoneNumber });
        if (!payer) {
            return res.status(404).json({ message: 'Payer not found.' });
        }

        // Calculate the split amount
        const splitAmount = totalAmount / group.members.length;

        // Create new expense in the database
        const expense = new Expense({
            description,
            amount: totalAmount,
            category,
            paidBy: payer._id,
            group: group._id,
            splitBetween: group.members.map(member => member._id), // All group members
        });

        // Save the new expense
        await expense.save();

        // Update balances and debts for each member in the group
        for (const member of group.members) {
            if (member._id.toString() === payer._id.toString()) {
                member.balance += splitAmount * (group.members.length - 1); // Payer gets reimbursed for others
            } else {
                member.balance -= splitAmount;

                // Update payer's debts for this member
                payer.debts[member._id] = (payer.debts[member._id] || 0) + splitAmount;

                // Update this member's debts for the payer
                member.debts[payer._id] = (member.debts[payer._id] || 0) - splitAmount;
            }

            // Save the updated user data for each member
            await member.save();
        }

        // Save the updated payer data
        await payer.save();

        return res.status(200).json({
            message: `Expense of ${totalAmount} split among group members successfully`,
            expense,
            data: {
                payer: payer.username,
                amountOwedPerMember: splitAmount,
            },
        });
    } catch (error) {
        console.error('Error splitting group expense:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


