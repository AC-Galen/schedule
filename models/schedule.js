const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

module.exports = mongoose.model('Schedule', scheduleSchema)