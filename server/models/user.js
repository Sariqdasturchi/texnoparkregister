const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  hobby: {type: String, require: true},
})



module.exports = mongoose.model('User', userSchema)
