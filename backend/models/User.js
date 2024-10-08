const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true // Ensuring uniqueness of phone numbers
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    debts: {
        type: Object,
        default: {}
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
