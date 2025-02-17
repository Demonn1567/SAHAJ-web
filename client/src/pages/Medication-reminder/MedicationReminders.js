import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function MedicationReminders() {
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "",
  });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get("https://127.0.0.1:8000/api/medications/");
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        axios.post("https://127.0.0.1:8000/api/medications/", formData, {
            withCredentials : true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          });
          
      fetchMedications();
      setFormData({ name: "", dosage: "", time: "" });
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        🩺 Medication Reminders
      </motion.h1>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <input 
          type="text" name="name" placeholder="Medication Name" required
          value={formData.name} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-3"
        />
        <input 
          type="text" name="dosage" placeholder="Dosage (e.g., 1 tablet)" required
          value={formData.dosage} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-3"
        />
        <input 
          type="time" name="time" required
          value={formData.time} onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-3"
        />
        <button 
          type="submit"
          className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 w-full"
        >
          ➕ Add Reminder
        </button>
      </form>

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Your Reminders</h2>
        {medications.length === 0 ? (
          <p className="text-gray-500">No reminders set.</p>
        ) : (
          medications.map((med, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-md mb-2 flex justify-between"
            >
              <div>
                <p className="text-lg font-medium">{med.name} - {med.dosage}</p>
                <p className="text-gray-500">⏰ {med.time}</p>
              </div>
              <button 
                onClick={() => alert("Reminder Deleted (Backend API Needed)")}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
