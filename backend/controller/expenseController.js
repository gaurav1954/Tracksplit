// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');
const Expense = require('../models/Expense');

exports.splitExpenseBetweenFriends = async (req, res) => {
    try {
        const { phoneNumbers, amount, description, category } = req.body;
        const payerPhoneNumber = res.locals.jwtData.phoneNumber;

        const payer = await User.findOne({ phoneNumber: payerPhoneNumber });
        if (!payer) {
            return res.status(404).json({ message: 'Payer must exist.' });
        }

        const friends = await User.find({ phoneNumber: { $in: phoneNumbers } });
        if (friends.length !== phoneNumbers.length) {
            return res.status(404).json({ message: 'One or more friends not found.' });
        }

        const splitAmount = Number((amount / (friends.length + 1)).toFixed(2));

        const expense = new Expense({
            description,
            amount,
            category,
            paidBy: payer._id,
            splitBetween: [payer._id, ...friends.map(friend => friend._id)],
        });

        await expense.save();

        for (const friend of friends) {
            friend.balance = Number(friend.balance) - splitAmount;
            friend.debts[payer._id] = Number(friend.debts[payer._id] || 0) - splitAmount;
            friend.expenses.push(expense._id);
            friend.markModified('debts');
            await friend.save();
        }

        payer.balance = Number(payer.balance) + splitAmount * friends.length;
        for (const friend of friends) {
            payer.debts[friend._id] = Number(payer.debts[friend._id] || 0) + splitAmount;
        }
        payer.expenses.push(expense._id);
        payer.markModified('debts');
        await payer.save();

        return res.status(200).json({
            message: `Expense of ${amount} split successfully`,
            user: payer,
        });
    } catch (error) {
        console.error('Error splitting expense:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.splitGroupExpense = async (req, res) => {
    try {
        const { groupId, amount, description, category } = req.body;
        const payerPhoneNumber = res.locals.jwtData.phoneNumber;

        const group = await Group.findById(groupId).populate('members');
        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }

        const payer = await User.findOne({ phoneNumber: payerPhoneNumber });
        if (!payer) {
            return res.status(404).json({ message: 'Payer not found.' });
        }

        const splitAmount = Number((amount / group.members.length).toFixed(2));

        const expense = new Expense({
            description,
            amount,
            category,
            paidBy: payer._id,
            group: group._id,
            splitBetween: group.members.map(member => member._id),
        });

        await expense.save();

        payer.expenses.push(expense._id);

        for (const member of group.members) {
            if (member._id.toString() === payer._id.toString()) {
                member.balance = Number(member.balance) + splitAmount * (group.members.length - 1);
            } else {
                member.balance = Number(member.balance) - splitAmount;

                payer.debts[member._id] = Number(payer.debts[member._id] || 0) + splitAmount;
                member.debts[payer._id] = Number(member.debts[payer._id] || 0) - splitAmount;

                member.expenses.push(expense._id);
            }

            member.markModified('debts');
            await member.save();
        }

        payer.markModified('debts');
        await payer.save();

        group.expenses.push(expense._id);
        await group.save();

        return res.status(200).json({
            message: `Expense of ${amount} split among group members successfully`,
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

exports.settleDebt = async (req, res) => {
    const { phoneNumber } = req.body;
    const userPhoneNumber = res.locals.jwtData.phoneNumber;

    try {
        const user = await User.findOne({ phoneNumber: userPhoneNumber });
        const friend = await User.findOne({ phoneNumber });

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found.' });
        }

        const netSettlement = Number(user.debts[friend._id]);

        if (netSettlement === 0 && Number(friend.debts[user._id] || 0) === 0) {
            return res.status(400).json({ message: 'No outstanding debts to settle.' });
        }

        user.balance = Number(user.balance) - netSettlement;
        friend.balance = Number(friend.balance) + netSettlement;

        user.debts[friend._id] = 0;
        friend.debts[user._id] = 0;

        user.markModified('debts');
        friend.markModified('debts');

        await user.save();
        await friend.save();

        res.status(200).json({
            message: 'Debt settled successfully.',
            user: {
                id: user._id,
                balance: user.balance,
                debts: user.debts,
            },
            friend: {
                id: friend._id,
                balance: friend.balance,
                debts: friend.debts,
            },
        });
    } catch (error) {
        console.error('Error settling debt:', error);
        res.status(500).json({ message: 'An error occurred while settling the debt.' });
    }
};
