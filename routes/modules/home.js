const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const User = require('../../models/user')
const dayjs = require('dayjs')



router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const name = req.user.name

    const ScheduleData = await Schedule.find({ userId }).sort({ _id: 'desc' }).lean()
    const user = await User.findOne({ name }).lean()
    const date = dayjs().format('YYYY年MM月DD日') 
    
    res.render('index', { ScheduleData, date, user }  )
  } catch(err) {
    console.log(err)
  }
})

module.exports = router 