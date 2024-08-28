const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createToken } = require('../utils/tokenManager')

const getAllUsers = async (req, res, next) => {
    res.status(200).json({ msg: "You are at the right place" });
};
const userSignUp = async (req, res, next) => {
    try {
        const { username, email, password, phoneNumber } = req.body;

        const existing = await User.findOne({ email });
        console.log(existing);
        if (existing)
            return res.status(401).send("User with this email already exists");

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        await user.save();
        return res
            .status(201)
            .json({ message: "Signup successful", id: user._id.toString() });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", cause: err.message });
    }
};

const userLogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken(user._id.toString(), email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Set the new auth_token cookie
        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            signed: true,
            path: "/",
            expires,
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error", cause: err.message });
    }
};

module.exports = { getAllUsers, userSignUp, userLogIn };
