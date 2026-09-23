require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie:", token);
  if (!token) return res.status(401).json({ error: "No token found in cookies." });
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token error:", err);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  res.status(403).json({ error: "Access denied. Admins only." });
};

exports.isNormalUser = (req, res, next) => {
  if (req.user && req.user.role === "normal_user") return next();
  res.status(403).json({ error: "Access denied. Normal users only." });
};

exports.isStoreOwner = (req, res, next) => {
  if (req.user && req.user.role === "store_owner") return next();
  res.status(403).json({ error: "Access denied. Store owners only." });
};
