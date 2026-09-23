const ratingModel = require("../models/ratingModel.js");
const storeModel = require("../models/storeModel.js");

exports.submitRating = async (req, res) => {
  const { sid } = req.params;
  const { rating } = req.body;
  const uid = req.user.uid;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
  }

  try {
    const store = await storeModel.getStoreById(sid);
    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found." });
    }

    // upsertRating inserts a new rating or updates the existing one for this user+store
    await ratingModel.upsertRating(uid, sid, rating);
    res.status(200).json({ success: true, message: "Rating submitted successfully." });
  } catch (err) {
    console.error("Error in submitRating:", err);
    res.status(500).json({ success: false, message: "Server error while submitting rating." });
  }
};
