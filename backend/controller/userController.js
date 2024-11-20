// controllers/userController.js
const User = require('../models/User');
const Group = require('../models/Group');


// Get current user info along with friends and groups
exports.getUserDetails = async (req, res) => {
    try {
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        // Fetch user and populate their friends
        const user = await User.findOne({ phoneNumber: userPhoneNumber })
            .populate('expenses')
            .populate('friends', 'username  phoneNumber ');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch groups where the user is a member
        const groups = await Group.find({ members: user._id })
            .populate('expenses')  // Populates the expenses field
            .populate('members', 'username  phoneNumber ');  // Populates the members field


        return res.status(200).json({
            message: 'User details fetched successfully',
            user,
            groups
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Add a friend to a user
// controllers/userController.js
exports.addFriend = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const userPhoneNumber = res.locals.jwtData.phoneNumber;

        // Find the user and the friend by their phone numbers
        const user = await User.findOne({ phoneNumber: userPhoneNumber });
        const friend = await User.findOne({ phoneNumber });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }

        // Add friend to user's friends list if not already added
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);

            // Initialize debt if not already present
            if (!user.debts[friend._id.toString()]) {
                user.debts[friend._id] = 0;  // Add debt field for friend
            }

            // Explicitly mark the debts field as modified
            user.markModified('debts');

            await user.save();
        }

        // Add user to friend's friends list if not already added
        if (!friend.friends.includes(user._id)) {
            friend.friends.push(user._id);

            // Initialize debt if not already present
            if (!friend.debts[user._id.toString()]) {
                friend.debts[user._id] = 0;  // Add debt field for user
            }

            // Explicitly mark the debts field as modified
            friend.markModified('debts');

            await friend.save();
        }

        // Return relevant friend information
        return res.status(200).json({
            message: 'Friend added successfully',
            friend: {
                id: friend._id,
                phoneNumber: friend.phoneNumber,
                username: friend.username
            },
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};




// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, memberPhoneNumbers } = req.body;
        const payerPhoneNumber = res.locals.jwtData.phoneNumber;

        // Include the phone number from JWT in the memberPhoneNumbers array if not already present
        if (!memberPhoneNumbers.includes(payerPhoneNumber)) {
            memberPhoneNumbers.push(payerPhoneNumber);
        }

        // Validate users and extract their ObjectIds
        const validMembers = await User.find({ phoneNumber: { $in: memberPhoneNumbers } });

        if (validMembers.length !== memberPhoneNumbers.length) {
            return res.status(404).json({ message: 'One or more members not found' });
        }

        // Extract the ObjectIds of the valid members
        const memberObjectIds = validMembers.map(member => member._id);

        // Create new group
        const group = new Group({
            name,
            members: memberObjectIds
        });

        // Save the group
        await group.save();

        return res.status(201).json({ message: 'Group created successfully', group });
    } catch (err) {
        console.error('Error creating group:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }

};


