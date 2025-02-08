require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
        });
        console.log(`✅ Database connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = dbConnect;
