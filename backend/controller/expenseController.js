// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');
const Expense = require('../models/Expense');

exports.splitExpenseBetweenFriends = async (req, res) => {
    try {
        const { phoneNumbers, amount, description, category } = req.body; // phoneNumbers is an array
        const payerPhoneNumber = res.locals.jwtData.phoneNumber; // Using phone number from JWT data

        // Ensure the payer exists
        const payer = await User.findOne({ phoneNumber: payerPhoneNumber });
        if (!payer) {
            return res.status(404).json({ message: 'Payer must exist.' });
        }

        // Fetch all friends from the array of phoneNumbers
        const friends = await User.find({ phoneNumber: { $in: phoneNumbers } });
        if (friends.length !== phoneNumbers.length) {
            return res.status(404).json({ message: 'One or more friends not found.' });
        }

        // Calculate the split amount between the payer and all friends
        const splitAmount = (amount / (friends.length + 1)).toFixed(2); // +1 for the payer, rounded to 2 decimal places

        // Create new expense in the database
        const expense = new Expense({
            description,
            amount,
            category,
            paidBy: payer._id,
            splitBetween: [payer._id, ...friends.map(friend => friend._id)],
        });

        // Save the new expense
        await expense.save();

        // Update balances and debts for each friend
        for (const friend of friends) {
            // Update friend's balance and debts
            friend.balance -= parseFloat(splitAmount); // Friend owes this amount (parseFloat to ensure it's a number)
            friend.debts[payer._id] = (friend.debts[payer._id] || 0) - parseFloat(splitAmount);

            // Push the expense ID to the friend's expenses
            friend.expenses.push(expense._id);

            // Mark debts as modified for Mongoose to save the changes
            friend.markModified('debts');

            // Save the updated friend data
            await friend.save();
        }

        // Update payer's balance and debts
        payer.balance += parseFloat(splitAmount) * friends.length; // Payer gets the sum of all friends' splits
        for (const friend of friends) {
            payer.debts[friend._id] = (payer.debts[friend._id] || 0) + parseFloat(splitAmount);
        }

        // Push the expense ID to the payer's expenses
        payer.expenses.push(expense._id);

        // Mark the debts as modified for Mongoose to save the changes
        payer.markModified('debts');

        // Save the updated payer data
        await payer.save();

        return res.status(200).json({
            message: `Expense of ${amount} split successfully`,
            expense,
            data: {
                payer: payer.username,
                friends: friends.map(friend => friend.username),
                amountOwedPerFriend: splitAmount,
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
        const splitAmount = (totalAmount / group.members.length).toFixed(2); // Rounded to 2 decimal places

        // Create new expense in the database
        const expense = new Expense({
            description,
            amount: totalAmount,
            category,
            paidBy: payer._id,
            group: group._id, // Associate with the group
            splitBetween: group.members.map(member => member._id), // All group members
        });

        // Save the new expense
        await expense.save();

        // Push the expense ID to the payer's expenses
        payer.expenses.push(expense._id); // Use `_id` to refer to the saved expense

        // Update balances and debts for each member in the group
        for (const member of group.members) {
            if (member._id.toString() === payer._id.toString()) {
                member.balance += parseFloat(splitAmount) * (group.members.length - 1); // Payer gets reimbursed for others
            } else {
                member.balance -= parseFloat(splitAmount);

                // Update payer's debts for this member
                payer.debts[member._id] = (payer.debts[member._id] || 0) + parseFloat(splitAmount);

                // Update this member's debts for the payer
                member.debts[payer._id] = (member.debts[payer._id] || 0) - parseFloat(splitAmount);

                // Push the expense ID to the friend's expenses as well
                member.expenses.push(expense._id);
            }

            // Save the updated user data for each member
            await member.save();
        }

        // Save the updated payer data
        await payer.save();

        // Push the expense ID to the group's expenses array (assuming Group model has an expenses array)
        group.expenses.push(expense._id);
        await group.save(); // Save the updated group data

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
