const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController.js");
const userCtrl = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/accessMiddleware.js");

router.post("/register", userCtrl.registerUser);
router.post("/login", authCtrl.loginUser);
router.post("/logout", authCtrl.logoutUser);
router.put("/update-password", verifyToken, userCtrl.updatePassword);

module.exports = router;
