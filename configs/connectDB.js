const mongoose = require('mongoose')
require('dotenv').config();

async function connectDB() {
    try {
        const CDB = await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB();