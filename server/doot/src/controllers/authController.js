const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
    try {
        console.log("📌 Registration request received:", req.body);
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("⚠️ User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, role });

        await newUser.save();
        console.log("✅ User registered successfully:", newUser);

        res.status(201).json({ message: `User registered with username ${username}` });

    } catch (err) {
        console.error("❌ Registration error:", err);
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
};

const login = async (req, res) => {
    try {
        console.log("📌 Login request received:", req.body);
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login successful:", { username: user.username, role: user.role });

        res.status(200).json({
            token,
            role: user.role,
            username: user.username,  
            message: "Login successful",
        });

    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Login failed. Please try again." });
    }
};




module.exports = { register, login };
