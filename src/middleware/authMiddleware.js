
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// PROTECT ROUTES
exports.protect = async (req, res, next) => {

  let token;

  // Check authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    token = req.headers.authorization.split(' ')[1];

  }

  // Token missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get logged-in user
    req.user = await User.findById(decoded.id);

    // Check user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });

  }
};

// ================= AUTHORIZE ROLES =================
exports.authorize = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });

    }

    next();

  };

};

