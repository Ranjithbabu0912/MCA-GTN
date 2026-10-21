const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = () => process.env.JWT_SECRET || "mca_gtn_secret_jwt_key_2026";
const getAdminUser = () => (process.env.ADMIN_USER || process.env.ADMIN_USERNAME || "admin").trim();
const getAdminPassword = () => (process.env.ADMIN_PASSWORD || "").trim();
const getAdminPin = () => (process.env.ADMIN_PIN || "").trim();

/**
 * POST /api/auth/login
 * Body: { username, password } OR { pin }
 */
router.post("/login", (req, res) => {
  // Reload .env so any manual edits by the user are immediately recognized
  require("dotenv").config();

  const { username, password, pin } = req.body;
  const adminPin = getAdminPin();
  const adminUser = getAdminUser();
  const adminPassword = getAdminPassword();

  let isValid = false;

  // Check PIN login
  if (pin && adminPin && pin.trim() === adminPin) {
    isValid = true;
  }
  // Check Username / Password login
  else if (
    username &&
    password &&
    adminPassword &&
    username.trim() === adminUser &&
    password.trim() === adminPassword
  ) {
    isValid = true;
  }

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid administrator credentials or PIN.",
    });
  }

  const token = jwt.sign({ username: adminUser, role: "admin" }, JWT_SECRET(), {
    expiresIn: "7d",
  });

  return res.json({
    success: true,
    message: "Authentication successful.",
    token,
    user: {
      username: adminUser,
      role: "Administrator",
    },
  });
});

/**
 * GET /api/auth/verify
 * Validates current token status
 */
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET());
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
