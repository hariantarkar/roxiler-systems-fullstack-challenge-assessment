const userModel = require("../models/userModel.js");
const storeModel = require("../models/storeModel.js");
const ratingModel = require("../models/ratingModel.js");
const bcrypt = require("bcrypt");
const { validateName, validateAddress, validateEmail, validatePassword } = require("../utils/validators.js");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countUsers();
    const totalStores = await storeModel.countStores();
    const totalRatings = await ratingModel.countRatings();

    res.status(200).json({
      success: true,
      data: { totalUsers, totalStores, totalRatings },
    });
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    res.status(500).json({ success: false, message: "Server error while fetching dashboard stats" });
  }
};

// admin adding a user/admin/store-owner account (role is passed explicitly, unlike public signup)
exports.addUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!validateName(name)) {
    return res.status(400).json({ success: false, message: "Name must be between 20 and 60 characters." });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }
  if (!validateAddress(address)) {
    return res.status(400).json({ success: false, message: "Address must be under 400 characters." });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be 8-16 characters with at least one uppercase letter and one special character.",
    });
  }
  if (!["admin", "normal_user", "store_owner"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role." });
  }

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const encPass = bcrypt.hashSync(password, 8);
    const result = await userModel.registerUser(name, email, address, encPass, role, true);

    if (result.affectedRows >= 1) {
      res.status(201).json({ success: true, message: "User added successfully" });
    } else {
      res.status(400).json({ success: false, message: "Failed to add user" });
    }
  } catch (err) {
    console.error("Error in addUser:", err);
    res.status(500).json({ success: false, message: "Server error while adding user" });
  }
};

exports.getAllUsers = async (req, res) => {
  const { name, email, address, role, sortBy, order } = req.query;

  try {
    const users = await userModel.getAllUsers({ name, email, address, role, sortBy, order });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ success: false, message: "Server error while fetching users" });
  }
};

exports.getUserDetails = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findUserById(uid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // store owners additionally show their store's rating on the detail view
    if (user.role === "store_owner") {
      const [store] = await storeModel.getAllStores({ ownerUid: uid });
      user.rating = store ? store.overallRating : null;
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error in getUserDetails:", err);
    res.status(500).json({ success: false, message: "Server error while fetching user details" });
  }
};

// admin/store_owner accounts created via public self-registration wait here until approved
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await userModel.getPendingUsers();
    res.status(200).json({ success: true, data: pendingUsers });
  } catch (err) {
    console.error("Error in getPendingUsers:", err);
    res.status(500).json({ success: false, message: "Server error while fetching pending users" });
  }
};

exports.approveUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await userModel.approveUser(uid);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "User approved successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error in approveUser:", err);
    res.status(500).json({ success: false, message: "Server error while approving user" });
  }
};
 // admin/store_owner accounts created via public self-registration wait here until approved
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await userModel.getPendingUsers();
    res.status(200).json({ success: true, data: pendingUsers });
  } catch (err) {
    console.error("Error in getPendingUsers:", err);
    res.status(500).json({ success: false, message: "Server error while fetching pending users" });
  }
};