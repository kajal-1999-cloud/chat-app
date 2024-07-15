const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');



router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client', 'register.html'));
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    let userpayload = {
      id: user._id,
      user: user.username,
      email: user.email
    }
    console.log("everthing good")
    const token = jwt.sign(userpayload, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client', 'register.html'));
});

module.exports = router;
