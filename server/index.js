const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

// User routes faylini import qilish
require('dotenv').config()

const app = express()

app.use(cors())
// Middleware
app.use(express.json())

// MongoDB ulanishi
const MONGO_URI = process.env.MONGO_URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB ulanishi muvaffaqiyatli!'))
  .catch(err => console.log('MongoDB ulanishida xatolik:', err))

// API marshrutlari
app.use('/api', userRoutes)

// Root yo'nalish
app.get('/', (req, res) => {
  res.send('Server ishlamoqda!')
})

// Port sozlash
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`)
})
