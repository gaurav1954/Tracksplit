const express = require('express');
const router = express.Router();
const { addFriend, createGroup, getFriendsList, getGroupsList } = require('../controller/userController');
const { verifyToken } = require('../utils/tokenManager');

router.use(verifyToken);

router.post('/addFriends', addFriend);
router.post('/groups', createGroup);
router.get('/friends', getFriendsList);
router.get('/groups', getGroupsList);

module.exports = router;
