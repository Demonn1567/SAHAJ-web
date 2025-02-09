const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid amount" 
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ 
      success: true, 
      order,
      key_id: process.env.RAZORPAY_KEY_ID // Send key_id to frontend
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create order" 
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing payment verification parameters" 
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully" 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: "Invalid signature" 
      });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ 
      success: false, 
      error: "Payment verification failed" 
    });
  }
};

module.exports = { createOrder, verifyPayment };