
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    sendTokenResponse(user, 201, res);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

//  LOGIN 
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// CURRENT USER 
exports.getMe = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

//  TOKEN RESPONSE 
const sendTokenResponse = (user, statusCode, res) => {

  // Create JWT Token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );

  // Send Response
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

