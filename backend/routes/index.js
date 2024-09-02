const express = require('express');
const appRouter = express.Router();
const authRouter = require('./authRoutes.js')
const userRouter = require('./userRoutes.js')

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);

module.exports = appRouter;
