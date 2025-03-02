const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const signup = require('./controllers/signup');
const authMiddleware = require('./middleware/authMiddleware');
const signin = require('./controllers/signin');
const routes = require('./routes/routes');
const ratelimit=require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const limiter=ratelimit({
    windowMs: 15*60*1000,
    max:100
});

dotenv.config();
// Create an Express app
const app = express();

// Connect to the database
connectDB();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies (alternative to bodyParser.json)

// Routes
app.use('/', routes); // Use the routes defined in routes/routes.js
app.use(limiter);
app.use(helmet());
app.use(morgan('common'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});