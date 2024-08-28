const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const appRouter = require('./routes/index');

dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev')); // for logs in dev environment
app.use(express.json()); // for parsing application/json
app.use(cookieParser(process.env.COOKIE_SECRET)); // for parsing cookies
app.use('/api/v1', appRouter); // routing

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the server only after successful DB connection
        app.listen(process.env.PORT, () => {
            console.log(`App running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
