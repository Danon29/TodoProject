const mongoose = require('mongoose')

const Todo = new mongoose.Schema(
  {
    text: { type: String, required: true, default: 'Something useful' },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        default: [],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', Todo)
