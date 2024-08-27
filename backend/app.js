const express = require('express')
const app = express();
const dotenv = require('dotenv')
const appRouter = require('./routes/appRouter')
dotenv.config();
const morgan = require("morgan");

//for logs in dev environment
app.use(morgan("dev"));
app.use("/api/v1", appRouter);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})