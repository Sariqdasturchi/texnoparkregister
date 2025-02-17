const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Foydalanuvchini qo'shish
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Foydalanuvchilarni olish
router.get('/users', async (req, res) => {
  console.log(req.body);
  console.log(res.status)
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
