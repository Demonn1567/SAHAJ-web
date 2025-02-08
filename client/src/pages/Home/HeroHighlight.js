import { HeroHighlight, Highlight } from "../../components/hero";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HeroHighlightDemo() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowPopup(true); 
    }
  }, []);

  return (
    <HeroHighlight>
      <div className='herotext'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Empowering Patients with Transparent and Inclusive Healthcare
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-lg px-4 md:text-2xl lg:text-3xl text-neutral-600 dark:text-gray-300 max-w-3xl leading-relaxed lg:leading-snug text-center mx-auto mt-4"
        >
          Bridging the gap between medical care and patient trust with innovative solutions.
        </motion.h2>
      </div>

      {showPopup && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in"
        >
          <p className="text-sm">✨ Login to access all 5 exclusive features! ✨</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="text-white bg-transparent border-0 text-lg font-bold px-2 hover:text-gray-200"
          >
            ×
          </button>
        </motion.div>
      )}
    </HeroHighlight>
  );
}
