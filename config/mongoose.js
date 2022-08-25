const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (req, res) => {
  console.log('mongodb error')
})
db.once('open', (req, res) => {
  console.log('mongodb connected')
})

module.exports = db