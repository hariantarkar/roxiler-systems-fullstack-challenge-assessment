const express = require("express");
const router = express.Router();
const storeCtrl = require("../controllers/storeController.js");
const ratingCtrl = require("../controllers/ratingController.js");
const { verifyToken, isNormalUser } = require("../middleware/accessMiddleware.js");

router.use(verifyToken, isNormalUser);

router.get("/stores", storeCtrl.getStoresForUser);
router.post("/stores/:sid/rating", ratingCtrl.submitRating);

module.exports = router;