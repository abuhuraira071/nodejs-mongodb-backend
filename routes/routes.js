const express = require('express');
const Router = express.Router();
// const { signin } = require('../controllers/signin');
// const { signup } = require('../controllers/signup');

const signup = require('../controllers/signup');
const login = require('../controllers/signin');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (no authentication required)
Router.post('/signup', signup); // User registration
Router.post('/login', login); // User login



// Protected route (requires authentication)
Router.get('/profile', authMiddleware, (req, res) => {
    // Access the authenticated user from req.user

const {username}=req.user
res.status(200).json({ 
    message: `Hello ${username}, Welcome to Your Profile`,
});
   
});

// Logout route
Router.get('/logout', (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = Router;