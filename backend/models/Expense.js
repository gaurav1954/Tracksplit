const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'drinks', 'fuel', 'entertainment', 'groceries', 'travel', 'other'], // Enum for categories
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    paidBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true // The user who paid for the expense
    },
    splitBetween: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true // The users among whom the expense is split
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
