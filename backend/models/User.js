const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true, // Ensure phoneNumber is required
        unique: true   // Ensure phoneNumber is unique
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});
