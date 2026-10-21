const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mca_gtn_secret_jwt_key_2026';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_PIN = process.env.ADMIN_PIN || 'admin123';

/**
 * POST /api/auth/login
 * Body: { username, password } OR { pin }
 */
router.post('/login', (req, res) => {
  const { username, password, pin } = req.body;

  let isValid = false;

  // Check PIN login
  if (pin && pin.trim() === ADMIN_PIN) {
    isValid = true;
  }
  // Check Username / Password login
  else if (username && password && username.trim() === ADMIN_USER && password.trim() === ADMIN_PASSWORD) {
    isValid = true;
  }

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials or PIN.'
    });
  }

  const token = jwt.sign(
    { username: ADMIN_USER, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Authentication successful.',
    token,
    user: {
      username: ADMIN_USER,
      role: 'Administrator'
    }
  });
});

/**
 * GET /api/auth/verify
 * Validates current token status
 */
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
