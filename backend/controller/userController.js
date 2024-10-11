// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');


// Get current user info along with friends and groups
exports.getUserDetails = async (req, res) => {
    try {
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        // Fetch user and populate their friends
        const user = await User.findOne({ phoneNumber: userPhoneNumber })
            .populate('friends', 'username email phoneNumber avatar');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch groups where the user is a member
        const groups = await Group.find({ members: user._id }).populate('expenses');

        return res.status(200).json({
            message: 'User details fetched successfully',
            user,
            friends: user.friends,
            groups
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


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


