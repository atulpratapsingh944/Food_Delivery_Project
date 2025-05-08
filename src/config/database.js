const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const connectDB = asyncHandler(async (req, res) => {
    let  client = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`database connected to ${client.connection.host}`);
});

module.exports = connectDB;