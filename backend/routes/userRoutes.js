const express = require('express');
const router = express.Router();
const { addFriend, createGroup } = require('../controller/userController');
const { verifyToken } = require('../utils/tokenManager');

router.use(verifyToken);

router.post('/addFriends', addFriend);
router.post('/groups', createGroup);

module.exports = router;
