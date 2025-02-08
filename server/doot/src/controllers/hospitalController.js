const PatientData = require("../models/patientDataModel");
const User = require("../models/userModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage }).single("file");

const getAllPatients = async (req, res) => {
    try {
        console.log("📌 Fetching all patients...");  
        const patients = await User.find({ role: "patient" }).select("-password");
        console.log("✅ Patients found:", patients); 

        if (!patients.length) {
            return res.status(404).json({ message: "No patients found" });
        }

        res.status(200).json({ patients });
    } catch (error) {
        console.error("❌ Error fetching patients:", error);
        res.status(500).json({ message: "Error fetching patients", error });
    }
};


const getAllDoctors = async(req,res) => {
    try {
        const doctors = await User.find({role : "doctor"}).select("-password");
        if(!patients.length) {
            return res.status(404).json({message : "No patients found"});
        }
        res.status(200).json({doctors});
    
    } catch(error) {
        console.error(error);
        res.status(500).json({message : "Error fetching patients", error});
    }
}

const uploadPatientData = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { additionalInfo } = req.body;

        const patientExists = await User.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }

        upload(req, res, async (err) => {
            if (err) {
                console.error("File upload error:", err);
                return res.status(500).json({ message: "File upload failed", error: err });
            }

            const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

            let patientData = await PatientData.findOne({ patientId });

            if (!patientData) {
                patientData = new PatientData({
                    patientId,
                    hospitalId: req.user.id,
                    uploadedFiles: [],
                    additionalInfo
                });
            }

            if (fileUrl) {
                patientData.uploadedFiles.push({ fileUrl });
            }
            if (additionalInfo) {
                patientData.additionalInfo = additionalInfo;
            }

            await patientData.save();
            console.log("✅ File uploaded for patient:", patientId);

            res.status(201).json({ message: "Data uploaded successfully", data: patientData });
        });

    } catch (error) {
        console.error("❌ Error uploading patient data:", error);
        res.status(500).json({ message: "Error uploading data", error });
    }
};

const getPatientData = async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientData = await PatientData.find({ patientId }).populate("hospitalId", "username role");

        if (!patientData.length) return res.status(404).json({ message: "No data found for this patient" });

        res.status(200).json({ patientData });
    } catch (error) {
        res.status(500).json({ message: "Error fetching patient data", error });
    }
};

module.exports = { getAllPatients, uploadPatientData, getPatientData, getAllDoctors };
