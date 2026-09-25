const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const { validateName, validateAddress, validateEmail, validatePassword } = require("../utils/validators.js");
const PUBLIC_ROLES = ["normal_user", "admin", "store_owner"];

exports.registerUser = async (req, res) => {
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
  if (!PUBLIC_ROLES.includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role." });
  }

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const encPass = bcrypt.hashSync(password, 8);
    // normal users are usable right away, admin/store_owner need an existing admin to approve them first
    const status = role === "normal_user";
    const result = await userModel.registerUser(name, email, address, encPass, role, status);

    if (result.affectedRows >= 1) {
      res.status(201).json({
        success: true,
        message: status ? "Registration successful" : "Registration submitted. An admin needs to approve this account before you can log in.",
        status,
      });
    } else {
      res.status(400).json({ success: false, message: "Registration failed" });
    }
  } catch (err) {
    console.error("Error in registration controller:", err);
    res.status(500).json({ success: false, message: "Server error while registering", error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const uid = req.user.uid;

  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      success: false,
      message: "New password must be 8-16 characters with at least one uppercase letter and one special character.",
    });
  }

  try {
    const user = await userModel.findUserById(uid);
    const fullUser = await userModel.findUserByEmail(user.email);

    const isMatch = bcrypt.compareSync(oldPassword, fullUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect." });
    }

    const encPass = bcrypt.hashSync(newPassword, 8);
    const result = await userModel.updatePassword(uid, encPass);

    if (result.affectedRows >= 1) {
      res.status(200).json({ success: true, message: "Password updated successfully." });
    } else {
      res.status(400).json({ success: false, message: "Password update failed." });
    }
  } catch (err) {
    console.error("Error in updatePassword controller:", err);
    res.status(500).json({ success: false, message: "Server error while updating password", error: err.message });
  }
};
