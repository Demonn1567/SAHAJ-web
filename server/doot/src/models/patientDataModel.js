const mongoose = require("mongoose");

const patientDataSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    uploadedFiles: [{ fileUrl: String, uploadedAt: { type: Date, default: Date.now } }],
    additionalInfo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("PatientData", patientDataSchema);
