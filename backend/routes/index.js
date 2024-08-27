const express = require('express');
const appRouter = express.Router();
const authRouter = require('./authRoutes.js')

appRouter.use("/auth", authRouter);

module.exports = appRouter;
