const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createSecretToken } = require("../tokengeneration/generateToken");

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!(username && email && password)) {
        return res.status(400).json({ message: "All input is required" });
    }

    try {
        // Check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ message: "User Already Exist. Please Login" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Debug: Log the new user object
        // console.log("New User Created:", newUser);

        // Generate token
        const token = createSecretToken(newUser._id);

        // Set cookie
        res.cookie('token', token, {
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });

        // Send response
     
        res.status(201).json({ 
            message: "User Created! Now you can login",
            username: newUser.username,
            email: newUser.email,
            token: token,
        });

    } catch (err) {
        console.error("Signup Error:", err); // Log the full error object
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

module.exports = signup;