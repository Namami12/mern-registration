const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Registration API
router.post('/register', async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;

  try {
    const newUser = new User({ firstName, lastName, mobileNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Mobile number already exists' });
    }
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
