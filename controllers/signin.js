const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createSecretToken } = require("../tokengeneration/generateToken");

const signin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!(email && password)) {
        return res.status(400).json({ message: "All input is required" });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // // Debug: Log the password and hashed password
        // console.log("Provided Password:", password);
        // console.log("Stored Hashed Password:", user.password);

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate token
        const token = createSecretToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });

        res.status(200).json({ 
            message: "Login successful",
            username: user.username,
            email: user.email,
            token: token,
        });


    } catch (err) {
        console.error("Login Error:", err); // Log the full error object
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

module.exports = signin;