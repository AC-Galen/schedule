const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')



router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router 