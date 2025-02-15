const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const https = require("https"); // Import HTTPS module
const path = require("path");

const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dbConnect();

const app = express();

const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "../key.pem"), "utf8"),  
    cert: fs.readFileSync(path.resolve(__dirname, "../cert.pem"), "utf8")
};


app.use(cors({
    origin: ["https://localhost:3000", "http://localhost:3000"], // Allow both
    credentials: true
}));
app.use(express.json());

const uploadPath = path.join(__dirname, "../uploads");

console.log(`📂 Serving static files from: ${uploadPath}`);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

app.use("/uploads", express.static(uploadPath));
app.use("/api/payment", paymentRoutes);

// Debugging Middleware
app.use((req, res, next) => {
    console.log(`📂 Requested File: ${req.url}`);
    next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hospital", hospitalRoutes);

const PORT = process.env.PORT || 7001;

// Start HTTPS Server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`🚀 HTTPS Server running on https://localhost:${PORT}`);
});

