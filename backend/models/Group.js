const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense' // References all the expenses associated with this group
    }]
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
