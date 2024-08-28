const express = require('express');
const authRouter = express.Router();
const { getAllUsers, userLogIn, userSignUp } = require('../controller/authController')

authRouter.get("/", getAllUsers);
authRouter.post("/signup", userSignUp);
authRouter.post("/login", userLogIn);

module.exports = authRouter;