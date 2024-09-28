// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');

// Add a friend to a user
exports.addFriend = async (req, res) => {
    try {
        const { friendPhoneNumber } = req.body;
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        const user = await User.findOne({ phoneNumber: userPhoneNumber });
        const friend = await User.findOne({ phoneNumber: friendPhoneNumber });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }

        // Add friend to user's friends list if not already added
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save();
        }

        return res.status(200).json({ message: 'Friend added successfully', user });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, memberPhoneNumbers } = req.body;

        // Validate users
        const validMembers = await User.find({ phoneNumber: { $in: memberPhoneNumbers } });
        if (validMembers.length !== memberPhoneNumbers.length) {
            return res.status(404).json({ message: 'One or more members not found' });
        }

        // Create new group
        const group = new Group({ name, members: memberPhoneNumbers });
        await group.save();

        return res.status(201).json({ message: 'Group created successfully', group });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getFriends = async (req, res) => {
    try {
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        // Fetch user and populate their friends
        const user = await User.findOne({ phoneNumber: userPhoneNumber }).populate('friends', 'username email phoneNumber avatar');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Friends list fetched successfully', friends: user.friends });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        // Fetch groups where the user is a member
        const groups = await Group.find({ members: userPhoneNumber });

        if (!groups || groups.length === 0) {
            return res.status(404).json({ message: 'No groups found' });
        }

        return res.status(200).json({ message: 'Groups list fetched successfully', groups });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
