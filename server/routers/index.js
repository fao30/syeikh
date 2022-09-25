const Controller = require("../controllers/controller");
let express = require("express");
const { userAut, restrictedOnly } = require("../middleware/middleware");

let router = express.Router();

router.post("/login", Controller.login); //login to the server
router.get("/all-visitor", userAut, Controller.allVisitor); //get all visitor
router.get("/all-user", userAut, Controller.allUser); //making
router.post("/register-user", userAut, restrictedOnly, Controller.registerUser); //register tema
router.post("/register-visitor", userAut, Controller.registerVisitor); //register patient
router.post("/register-new-visit", userAut, Controller.registerNewVisit); //register new visit
router.patch("/edit-visit/:id", userAut, Controller.editVisit); //register new visit
router.get("/all-visit", userAut, Controller.allVisit); //get all visitor data
router.get("/data/:id", Controller.dataById); //making
router.get("/data-all", userAut, Controller.getAllData); //making
router.get("/user/admins", Controller.listAdmins); //making
router.get("/user/doctors", Controller.listDoctors); //get all list of doctors
router.get("/user/admins", Controller.listAdmins); //get all list of doctors
router.get("/count-doctor", userAut, Controller.Count); //get all list of doctors
router.get("/count-admin", Controller.CountAdmin); //get all list of doctors
router.get("/count-patient", Controller.CountPatient); //get all list of doctors
router.get("/count-first-patient", Controller.CountPatientFirst); //get all list of doctors
router.get("/count-platform", Controller.CountPlatformIncome); //get all list Platform
router.get("/medcard/:patientId", Controller.MedcardByPatientId); //get all list of doctors

module.exports = router;
