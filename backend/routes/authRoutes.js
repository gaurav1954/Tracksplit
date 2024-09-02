const express = require('express');
const authRouter = express.Router();
const { userLogIn, userSignUp, logout } = require('../controller/authController');

authRouter.post("/signup", userSignUp);
authRouter.post("/login", userLogIn);
authRouter.post("/logout", logout);


module.exports = authRouter;