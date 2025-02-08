const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const router = express.Router();

router.use(verifyToken, authorizeRoles);


router.get("/patient", verifyToken,authorizeRoles("patient"), (req,res)=> {
    res.json({message : "Welcome Patient"});
})


router.get("/phfeed",verifyToken,authorizeRoles("patient", "hospital") ,(req,res)=> {
    res.json({message : "Welcome Hospital and Patient"});
});


router.get("/all",verifyToken,authorizeRoles("patient", "hospital", "doctor") ,(req,res) => {
    res.json({message : "Welcome"})
})

router.get("/doctor-portal", verifyToken, authorizeRoles("doctor"), (req, res) => {
    res.json({ message: "Welcome Doctor" });
});
router.get("/hospital-portal", verifyToken, authorizeRoles("hospital"), (req, res) => {
    res.json({ message: "Welcome Hospital" });
});


//jo patient second opinion doctor lega ussi ka data doctor ke paas jaaye

module.exports = router;
