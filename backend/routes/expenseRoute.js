const express = require('express');
const { splitGroupExpense, splitExpenseBetweenFriends, settleDebt } = require('../controller/expenseController');
const { verifyToken } = require('../utils/tokenManager');

const router = express.Router();
router.use(verifyToken);
// POST /api/expense/split/group
router.post('/split/friends', splitExpenseBetweenFriends);
router.post('/split/group', splitGroupExpense);
router.post('/settle', settleDebt);

module.exports = router;
