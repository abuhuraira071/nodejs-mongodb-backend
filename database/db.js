const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// This function will connect to the database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            tls: true, // Enable TLS/SSL
            
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('Mongodb Connection Successful');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;