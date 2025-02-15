import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function HospitalPortal() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://localhost:7001/api/hospital/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("❌ Please select a file to upload!");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("additionalInfo", notes);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`https://localhost:7001/api/hospital/upload/${selectedPatient._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("✅ Data uploaded successfully!");
      setFile(null);
      setNotes("");
      handlePatientClick(selectedPatient);
    } catch (error) {
      console.error("❌ Error uploading data:", error);
      alert("❌ Upload failed. Please try again.");
    }
  };

  const handlePatientClick = async (patient) => {
    setSelectedPatient(patient);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://localhost:7001/api/hospital/patient/${patient._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientData(res.data.patientData);
    } catch (error) {
      console.error("Error fetching patient data:", error);

    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src="/hospital-icon.png" alt="Hospital Icon" className="w-10 h-10 mr-3" />
          <h1 className="text-4xl font-extrabold text-gray-900">Hospital Portal</h1>
        </div>
        
        {/* Guidelines Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 shadow-md"
        >
          <div className="flex items-start">
            <span className="text-2xl mr-3">📌</span>
            <div>
              <h2 className="text-lg font-semibold text-blue-800">Hospital Guidelines</h2>
              <p className="text-gray-700 mt-1">Click on each patient to view and upload their medical records, prescriptions, and additional data.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <motion.div
              key={patient._id}
              onClick={() => handlePatientClick(patient)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100"
              whileHover={{ scale: 1.02, translateY: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-sm text-green-800 font-medium">Active</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{patient.username}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="text-sm bg-purple-100 px-2 py-1 rounded-md">
                      🆔 {patient._id.substring(0, 8)}...
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.username}'s Data</h2>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Notes Textarea */}
                <div className="mb-6">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter additional notes..."
                    className="w-full p-4 h-32 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">📎</span>
                        <span className="text-gray-600">{file ? file.name : "Choose File"}</span>
                      </div>
                      <span className="text-sm text-gray-400">{!file && "no file selected"}</span>
                    </label>
                  </div>
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform transition-all duration-200 hover:shadow-lg"
                >
                  Upload Data
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="w-full py-4 mt-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Close
                </button>

                {/* Previous Uploads */}
                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <span className="text-xl mr-2">📂</span>
                    <h3 className="text-xl font-semibold text-gray-900">Previous Uploads:</h3>
                  </div>
                  <div className="space-y-3">
                    {patientData.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No files uploaded yet.</p>
                    ) : (
                      patientData.map((data, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-start mb-2">
                            <span className="text-lg mr-2">📝</span>
                            <div>
                              <span className="font-medium text-gray-700">Notes: </span>
                              <span className="text-gray-600">{data.additionalInfo || "No notes provided"}</span>
                            </div>
                          </div>
                          {data.uploadedFiles.length > 0 && (
                            <div className="ml-7">
                              <a
                                href={`https://localhost:7001${data.uploadedFiles[0].fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <span className="text-lg mr-2">📄</span>
                                View File
                              </a>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}