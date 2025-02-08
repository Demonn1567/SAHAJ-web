import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaIdBadge } from "react-icons/fa";

export default function DoctorPortal() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
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
            console.error("❌ Error fetching patients:", error);
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
            console.error("❌ Error fetching patient data:", error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen p-10 bg-gray-50">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">🩺 Patient Data</h1>

            <div className="grid grid-cols-3 gap-6">
                {patients.map((patient) => (
                    <motion.div
                        key={patient._id}
                        onClick={() => handlePatientClick(patient)}
                        className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FaUser className="mr-2" /> {patient.username}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                            <FaIdBadge className="mr-2 text-purple-500" /> Sahaj ID: {patient._id}
                        </p>
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
                    <div className="bg-white rounded-lg p-8 shadow-xl w-2/3">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            🏥 {selectedPatient.username}'s Medical Data
                        </h2>

                        {loading ? (
                            <p className="text-center text-gray-600">Loading...</p>
                        ) : patientData.length === 0 ? (
                            <p className="text-gray-500">No data uploaded yet.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-6">
                                {patientData.map((data, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-100 p-5 rounded-lg shadow-md transition-all"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <p className="text-gray-700">
                                            <strong>📝 Notes:</strong> {data.additionalInfo || "No notes provided"}
                                        </p>
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
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => setSelectedPatient(null)}
                            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all shadow-md w-full"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
