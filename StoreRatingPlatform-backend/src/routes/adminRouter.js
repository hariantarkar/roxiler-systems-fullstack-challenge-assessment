const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController.js");
const storeCtrl = require("../controllers/storeController.js");
const { verifyToken, isAdmin } = require("../middleware/accessMiddleware.js");

router.use(verifyToken, isAdmin);

router.get("/dashboard", adminCtrl.getDashboardStats);

router.post("/users", adminCtrl.addUser);
router.get("/users", adminCtrl.getAllUsers);
router.get("/users/:uid", adminCtrl.getUserDetails);

router.post("/stores", storeCtrl.addStore);
router.get("/stores", storeCtrl.getAllStores);

module.exports = router;
