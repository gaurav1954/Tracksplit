const express = require('express');
const router = express.Router();
const { addFriend, createGroup, getUserDetails } = require('../controller/userController');
const { verifyToken } = require('../utils/tokenManager');

router.use(verifyToken);

router.get('/userInfo', getUserDetails);
router.post('/addFriend', addFriend);
router.post('/createGroup', createGroup);

module.exports = router;
