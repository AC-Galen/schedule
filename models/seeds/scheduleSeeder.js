const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const User = require('../user')
const Schedule = require('../schedule')
const Todo = require('../todo')

const users = require('./users.json')
const schedules = require('./schedule.json')
const todos = require('./todo.json')


db.once('open', async () => {
  try {
    await Promise.all(
      users.map(async user => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
      })
    )
    await Promise.all(  
      schedules.map(async schedule => {
        const user = await User.findOne({ name: schedule.user })
        schedule.userId = user._id
        await Schedule.create(schedule)
      })
    )

    process.exit()
  } catch (err) {
    console.log(err)
  }
})