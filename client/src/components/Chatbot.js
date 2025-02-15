import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "👋 Hi there! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true); 

    try {
      const response = await axios.post("https://localhost:7001/api/chatbot/chat", { message: input });

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
        setIsTyping(false);
      }, 1200);
      
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Unable to connect to the server." }]);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <motion.button 
          className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          🩺 Chat with AI
        </motion.button>
      )}

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-[420px] h-[550px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-teal-400"
        >
          <div className="bg-teal-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">💬 Health AI Assistant</h3>
            <button className="text-white hover:text-gray-300 text-xl" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[440px] bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 w-max max-w-[85%] p-3 rounded-xl shadow ${
                  msg.sender === "user"
                    ? "bg-teal-500 text-white self-end"
                    : "bg-white text-gray-800 border border-gray-300 self-start"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-gray-500 bg-gray-200 px-3 py-2 rounded-lg w-max self-start animate-pulse"
              >
                ⌛ Typing...
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex items-center bg-white">
            <input 
              type="text"
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 ml-2" onClick={sendMessage}>
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
