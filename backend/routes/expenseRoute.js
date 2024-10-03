const express = require('express');
const { splitGroupExpense, splitExpenseBetweenFriends } = require('../controllers/expenseController');

const router = express.Router();

// POST /api/expense/split/group
router.post('/split/friends', splitExpenseBetweenFriends);
router.post('/split/group', splitGroupExpense);

module.exports = router;
