const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/user')

// User routes faylini import qilish
require('dotenv').config()
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Middleware
app.use(express.json())
// API marshrutlari
app.use('/api', userRoutes)

// MongoDB ulanishi
const MONGO_URI = process.env.MONGO_URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB ulanishi muvaffaqiyatli!'))
  .catch(err => console.log('MongoDB ulanishida xatolik:', err))

// Userlarni qoshish
app.get('/api/users', async (req, res) => {
  try {
    //Barcha foydalanuvchilarni bazadan olish
    const users = await User.find()
    res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully',
      data: users
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: err.message
    })
  }
})

app.post('/api/users', async (req, res) => {
  try {
    const { name, firstName, email, phone, hobby } = req.body
    if (!name || !firstName || !email || !phone || !hobby) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      })
    }
    //Yangi foydalanuvchini yaratish
    const newUser = new User({ name, firstName, email, phone, hobby })

    //Foydalanuvchini saqlash
    await newUser.save()
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: newUser
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user',
      error: err.message
    })
  }
})
// Port sozlash
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`)
})
