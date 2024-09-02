const express = require('express');
const router = express.Router();
const { addFriend, createGroup } = require('../controller/userController');

router.post('/:phoneNumber/friends', addFriend);
router.post('/groups', createGroup);

module.exports = router;
