const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: { type: String, required: true },
  isDone: { type: Boolean, default: false},
  scheduleId: { type: Schema.Types.ObjectId, ref: 'Schedule', index: true, required: true }
})

module.exports = mongoose.model('Todo', todoSchema)