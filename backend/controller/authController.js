const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createToken } = require('../utils/tokenManager')

const userSignUp = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body;

        const existing = await User.findOne({ phoneNumber });
        console.log(existing);
        if (existing)
            return res.status(401).send("User with this phoneNumber already exists");

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashedPassword,
            phoneNumber,
        });

        await user.save();
        return res
            .status(200)
            .json({ message: "Signup successful", id: user._id.toString() });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", cause: err.message });
    }
};

const userLogIn = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Clear the auth_token cookie
        console.log(process.env.COOKIE_NAME)

        const token = createToken(phoneNumber, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Set the new auth_token cookie
        res.cookie(process.env.COOKIE_NAME, token, {
            signed: true,
            path: "/",
            expires,
            secure: process.env.NODE_ENV === 'production', // Set secure to true in production
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            sameSite: 'None' // Needed if you're sending cookies in cross-origin requests
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error", cause: err.message });
    }
};
const logout = (req, res) => {
    try {
        // Clear the auth token cookie
        res.clearCookie(process.env.COOKIE_NAME, {
            path: '/',
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error", cause: err.message });
    }
}


module.exports = { userSignUp, userLogIn, logout };

