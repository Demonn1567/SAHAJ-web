const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                chat_history: [],
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${COHERE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const botReply = response.data.text || "I'm not sure how to respond to that.";

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
