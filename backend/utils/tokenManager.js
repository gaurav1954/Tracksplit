const jwt = require('jsonwebtoken');

const createToken = (phoneNumber, expiresIn) => {
    const payload = { phoneNumber };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
    return token;
};

// Middleware
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${process.env.COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token expired" });
        } else {
            console.log("Token verification successful");
            res.locals.jwtData = decoded; // Store the decoded data in res.locals
            return next();
        }
    });
};

module.exports = { createToken, verifyToken };
