import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

export default function SpotlightSearch({ data, isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const placeholderTexts = [
    "Search for Dhancha...",
    "Find Aankh features...",
    "Look up Jagrook...",
    "Explore Samaksh...",
    "Discover Dvit..."
  ];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Fuzzy search using Fuse.js
  const fuse = new Fuse(data, {
    keys: ["name", "description"],
    includeScore: true,
    threshold: 0.3,
  });

  const filteredData = query ? fuse.search(query).map((result) => result.item) : [];

  const handleSelect = (item) => {
    onClose();
    setQuery("");
    navigate(item.path);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => Math.min(prev + 1, filteredData.length - 1));
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter") {
        if (filteredData[selectedIndex]) handleSelect(filteredData[selectedIndex]);
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50"
    >
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl p-5 relative">
        <motion.input
          ref={inputRef}
          type="text"
          placeholder={placeholderTexts[placeholderIndex]}
          className="w-full p-4 text-lg border-b outline-none focus:border-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          animate={{ opacity: [0, 1], transition: { duration: 0.8, ease: "easeInOut" } }}
        />
        <ul className="mt-2 max-h-64 overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <li
                key={item.id}
                className={`p-3 cursor-pointer text-gray-700 rounded-md transition-all duration-150 ${
                  selectedIndex === index ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(item)}
              >
                <strong>{item.name}</strong> - {item.description}
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500">No results found</li>
          )}
        </ul>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}