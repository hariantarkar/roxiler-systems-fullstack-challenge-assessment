const storeModel = require("../models/storeModel.js");
const { validateName, validateAddress, validateEmail } = require("../utils/validators.js");

exports.addStore = async (req, res) => {
  const { name, email, address, ownerUid } = req.body;

  if (!validateName(name)) {
    return res.status(400).json({ success: false, message: "Name must be between 20 and 60 characters." });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }
  if (!validateAddress(address)) {
    return res.status(400).json({ success: false, message: "Address must be under 400 characters." });
  }

  try {
    const result = await storeModel.saveStore(name, email, address, ownerUid || null);

    if (result.affectedRows >= 1) {
      res.status(201).json({ success: true, message: "Store added successfully" });
    } else {
      res.status(400).json({ success: false, message: "Failed to add store" });
    }
  } catch (err) {
    console.error("Error in addStore:", err);
    res.status(500).json({ success: false, message: "Server error while adding store" });
  }
};

exports.getAllStores = async (req, res) => {
  const { name, email, address, sortBy, order } = req.query;

  try {
    const stores = await storeModel.getAllStores({ name, email, address, sortBy, order });
    res.status(200).json({ success: true, data: stores });
  } catch (err) {
    console.error("Error in getAllStores:", err);
    res.status(500).json({ success: false, message: "Server error while fetching stores" });
  }
};
exports.updateStore = async (req, res) => {
  const { sid } = req.params;
  const { name, email, address, ownerUid } = req.body;

  if (!validateName(name)) {
    return res.status(400).json({ success: false, message: "Name must be between 20 and 60 characters." });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }
  if (!validateAddress(address)) {
    return res.status(400).json({ success: false, message: "Address must be under 400 characters." });
  }

  try {
    const result = await storeModel.updateStore(sid, name, email, address, ownerUid);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Store updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Store not found" });
    }
  } catch (err) {
    console.error("Error in updateStore:", err);
    res.status(500).json({ success: false, message: "Server error while updating store" });
  }
};
exports.getStoresForUser = async (req, res) => {
  const { name, address, sortBy, order } = req.query;
  const uid = req.user.uid;

  try {
    const stores = await storeModel.getStoresForUser(uid, { name, address, sortBy, order });
    res.status(200).json({ success: true, data: stores });
  } catch (err) {
    console.error("Error in getStoresForUser:", err);
    res.status(500).json({ success: false, message: "Server error while fetching stores" });
  }
};
