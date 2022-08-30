const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')



router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const ScheduleData = await Schedule.find({userId}).sort({ _id: 'asc' }).lean()
    res.render('index',  { ScheduleData }  )
  } catch {
    console.log(err)
  }
})

module.exports = router 