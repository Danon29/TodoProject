const mongoose = require('mongoose')

const Tag = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tag', Tag)
