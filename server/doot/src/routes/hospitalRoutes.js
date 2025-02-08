const express = require("express");
const { getAllPatients, uploadPatientData, getPatientData, getAllDoctors } = require("../controllers/hospitalController");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/patients", verifyToken, authorizeRoles("hospital", "doctor"), getAllPatients);
router.post("/upload/:patientId", verifyToken, authorizeRoles("hospital"), uploadPatientData);
router.get("/patient/:patientId", verifyToken, authorizeRoles("hospital", "patient", "doctor"), getPatientData);
router.get("/doctors",getAllDoctors);


module.exports = router;
