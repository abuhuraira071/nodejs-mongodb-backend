const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
}

module.exports = { createSecretToken };