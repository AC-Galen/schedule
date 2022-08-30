const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const dayjs = require('dayjs')



router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const ScheduleData = await Schedule.find({userId}).sort({ _id: 'asc' }).lean()
    const date = dayjs().format('YYYY年MM月DD日') 
    res.render('index', { ScheduleData, date }  )
  } catch(err) {
    console.log(err)
  }
})

module.exports = router 