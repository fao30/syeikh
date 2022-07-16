const Controller = require("../controllers/controller");
let express = require("express");
const { userAut, restrictedOnly } = require("../middleware/middleware");

let router = express.Router();

router.post("/login", Controller.login); //login to the server
router.get("/all-visitor",userAut, Controller.allVisitor); //get all visitor
router.get("/all-user",userAut, Controller.allUser); //making
router.post("/register-user",userAut, restrictedOnly, Controller.registerUser); //register tema
router.post("/register-visitor",userAut, Controller.registerVisitor); //register patient
router.post("/register-new-visit",userAut, Controller.registerNewVisit); //register new visit
router.get("/all-visit",userAut, Controller.allVisit); //get all visitor data
router.get("/data/:id", Controller.dataById); //making
router.get("/data-all", userAut, Controller.getAllData); //making
router.get("/user/admins", Controller.listAdmins); //making
router.get("/user/doctors", Controller.listDoctors); //get all list of doctors
router.get("/user/admins", Controller.listAdmins); //get all list of doctors

// //create VA
// router.get("/getva/:id", userAut, Controller.getVa);
// router.post("/createva", userAut, Controller.createVa);
// //Get Va
// router.post("/callback", Controller.callback);
// router.post("/payment", userAut, Controller.payment);
// router.post("/checkpayment", Controller.chechPayment);
// router.get("/balance", Controller.getBalance);

// router.post("/addbook", userAut, Controller.addbook);
// router.delete("/deletecart", userAut, Controller.deleteCart);
// router.get("/databyuser", userAut, Controller.dataByUser);

module.exports = router;
