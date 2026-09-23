const storeModel = require("../models/storeModel.js");
const ratingModel = require("../models/ratingModel.js");

exports.getOwnerDashboard = async (req, res) => {
  const ownerUid = req.user.uid;

  try {
    const store = await storeModel.getStoreByOwnerUid(ownerUid);
    if (!store) {
      return res.status(404).json({ success: false, message: "No store found for this owner." });
    }

    const raters = await ratingModel.getRatersForStore(store.sid);
    const averageRating = await ratingModel.getAverageRatingForStore(store.sid);

    res.status(200).json({
      success: true,
      data: { storeName: store.name, averageRating, raters },
    });
  } catch (err) {
    console.error("Error in getOwnerDashboard:", err);
    res.status(500).json({ success: false, message: "Server error while fetching dashboard." });
  }
};