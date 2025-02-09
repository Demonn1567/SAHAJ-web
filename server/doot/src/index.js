const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const path = require("path");
const fs = require("fs");

const paymentRoutes = require("./routes/paymentRoutes");



dbConnect();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const uploadPath = path.join(__dirname, "../uploads");  

console.log(`📂 Serving static files from: ${uploadPath}`);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

app.use("/uploads", express.static(uploadPath));
app.use("/api/payment", paymentRoutes);


app.use((req, res, next) => {
    console.log(`📂 Requested File: ${req.url}`);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hospital", hospitalRoutes);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
