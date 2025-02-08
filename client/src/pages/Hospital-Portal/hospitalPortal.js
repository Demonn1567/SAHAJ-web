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
      const res = await axios.get("http://localhost:7001/api/hospital/patients", {
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
      const response = await axios.post(`http://localhost:7001/api/hospital/upload/${selectedPatient._id}`, formData, {
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
      const res = await axios.get(`http://localhost:7001/api/hospital/patient/${patient._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientData(res.data.patientData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">🏥 Hospital Portal</h1>
      
      {/* Guidelines Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-100 border border-blue-300 shadow-lg rounded-lg p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-blue-800">📌 Hospital Guidelines</h2>
        <p className="text-gray-700 mt-2">Click on each patient to view and upload their medical records, prescriptions, and additional data.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {patients.map((patient) => (
          <motion.div
            key={patient._id}
            onClick={() => handlePatientClick(patient)}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">👤 {patient.username}</h3>
            <p className="text-sm text-gray-600">🆔 Sahaj ID: {patient._id}</p>
          </motion.div>
        ))}
      </div>

      {selectedPatient && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-8 shadow-xl w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPatient.username}'s Data</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter additional notes..."
              className="w-full p-3 border rounded-lg text-gray-800 shadow-sm"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-3"
            />
            <button
              onClick={handleUpload}
              className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all shadow-md w-full"
            >
              Upload Data
            </button>
            <button
              onClick={() => setSelectedPatient(null)}
              className="mt-3 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-all shadow-md w-full"
            >
              Close
            </button>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">📂 Previous Uploads:</h3>
              {patientData.length === 0 ? (
                <p className="text-gray-500">No files uploaded yet.</p>
              ) : (
                patientData.map((data, index) => (
                  <div key={index} className="border p-4 my-2 rounded-lg bg-gray-100 shadow-sm">
                    <p className="text-gray-700"><strong>📝 Notes:</strong> {data.additionalInfo || "No notes provided"}</p>
                    {data.uploadedFiles.length > 0 && (
                      <a
                        href={`http://localhost:7001${data.uploadedFiles[0].fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        📄 View File
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}