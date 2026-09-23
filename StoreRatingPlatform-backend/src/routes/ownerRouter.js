const express = require("express");
const router = express.Router();
const ownerCtrl = require("../controllers/ownerController.js");
const { verifyToken, isStoreOwner } = require("../middleware/accessMiddleware.js");

router.use(verifyToken, isStoreOwner);

router.get("/dashboard", ownerCtrl.getOwnerDashboard);

module.exports = router;