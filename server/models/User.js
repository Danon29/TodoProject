const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', User)
