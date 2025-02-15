import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaIdBadge, FaNotesMedical, FaFileMedical, FaTimes } from "react-icons/fa";

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
            const res = await axios.get("https://localhost:7001/api/hospital/patients", {
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
            const res = await axios.get(`https://localhost:7001/api/hospital/patient/${patient._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPatientData(res.data.patientData);
        } catch (error) {
            console.error("❌ Error fetching patient data:", error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center mb-12">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                        <FaNotesMedical className="text-4xl text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Patient Data
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {patients.map((patient) => (
                        <motion.div
                            key={patient._id}
                            onClick={() => handlePatientClick(patient)}
                            className="group relative bg-white backdrop-blur-lg bg-opacity-80 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-bl-full rounded-tr-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="relative">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <FaUser className="text-xl text-purple-600" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {patient.username}
                                </h3>
                                
                                <p className="text-sm text-gray-600 flex items-center">
                                    <FaIdBadge className="mr-2 text-purple-500" />
                                    <span className="font-mono">ID: {patient._id}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {selectedPatient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <FaUser className="text-xl text-gray-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 ml-3">
                                        {selectedPatient.username}'s Medical Data
                                    </h2>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                                    <p className="mt-4 text-gray-600 font-medium">Loading patient data...</p>
                                </div>
                            ) : patientData.length === 0 ? (
                                <div className="text-center py-12">
                                    <FaFileMedical className="text-4xl text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No medical records available yet.</p>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                    {patientData.map((data, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-50 rounded-xl p-5"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <FaNotesMedical className="text-blue-600 text-lg" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-700">
                                                            <span className="font-medium text-gray-900">Notes:</span> {data.additionalInfo || "No notes provided"}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {data.uploadedFiles.length > 0 && (
                                                    <div className="flex items-center ml-11">
                                                        <a
                                                            href={`https://localhost:7001${data.uploadedFiles[0].fileUrl}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                                        >
                                                            <FaFileMedical className="mr-2" />
                                                            View File
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-gray-100 p-4">
                                <button
                                    onClick={() => setSelectedPatient(null)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-xl font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}