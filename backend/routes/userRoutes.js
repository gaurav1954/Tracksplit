const express = require('express');
const router = express.Router();
const { addFriend, createGroup, getUserDetails } = require('../controller/userController');
const { verifyToken } = require('../utils/tokenManager');

router.use(verifyToken);

router.get('/userInfo', getUserDetails);
router.post('/addFriends', addFriend);
router.post('/groups', createGroup);

module.exports = router;
