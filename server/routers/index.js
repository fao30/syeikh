const Controller = require("../controllers/controller");
let express = require("express");
const { userAut, restrictedOnly } = require("../middleware/middleware");

let router = express.Router();

// router.get("/currency", Controller.currencyApi);
// router.get("/all-user", Controller.allUser); //making
router.post("/login", Controller.login); //making
router.get("/all-visitor",userAut, Controller.allVisitor); //making
router.get("/all-user", Controller.allUser); //making
router.post("/register-user",userAut, restrictedOnly, Controller.registerUser); //making
router.post("/register-visitor",userAut, Controller.registerVisitor); //making
router.get("/all-visit",userAut, Controller.allVisit); //making
// router.patch("/detail/reduceseat", Controller.reduceSeat); //making

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
