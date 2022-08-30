const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  memo: { type: String, required: true },
  reminder: { type: String, required: true },
  date: { type: String, required: true },
  todo: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

module.exports = mongoose.model('Schedule', scheduleSchema)