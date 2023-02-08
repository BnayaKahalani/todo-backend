const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  urgency: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)
