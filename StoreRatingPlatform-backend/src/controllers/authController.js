require("dotenv").config();
const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }
    if (!user.status) {
       return res.status(403).json({ success: false, message: "Your account is pending admin approval." });
  }
    const token = jwt.sign(
      { uid: user.uid, username: user.name, role: user.role },
      secretKey,
      { expiresIn: "1d" }
    );

  const isProduction = process.env.NODE_ENV === "production";
res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
});
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { uid: user.uid, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Error in login controller:", err);
    res.status(500).json({ success: false, message: "Server error while logging in", error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully." });
};


