const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mca_gtn_secret_jwt_key_2026';
const ADMIN_PIN = process.env.ADMIN_PIN || 'admin123';

function authMiddleware(req, res, next) {
  // Allow passing either JWT token or direct admin PIN
  const authHeader = req.headers.authorization;
  const pinHeader = req.headers['x-admin-pin'];

  // Check PIN header directly
  if (pinHeader && pinHeader === ADMIN_PIN) {
    req.admin = { username: 'admin', role: 'superadmin' };
    return next();
  }

  // Check Bearer token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Access denied. Please authenticate with administrator PIN or token.'
  });
}

module.exports = { authMiddleware };
