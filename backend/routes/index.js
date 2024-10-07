const express = require('express');
const appRouter = express.Router();
const authRouter = require('./authRoutes.js')
const expenseRouter = require('./expenseRoute.js')
const userRouter = require('./userRoutes.js')

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/expense", expenseRouter);

module.exports = appRouter;
