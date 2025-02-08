const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PatientData = require("./src/models/patientDataModel");

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const cleanupDatabase = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");

        const result = await PatientData.deleteMany({});
        console.log(`🗑️ Deleted ${result.deletedCount} incorrect patient uploads.`);

        mongoose.connection.close();
        console.log("✅ Database cleanup complete!");
    } catch (error) {
        console.error("❌ Error cleaning database:", error);
        mongoose.connection.close();
    }
};

cleanupDatabase();
