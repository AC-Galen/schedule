const express = require("express")
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const schedule = require('./modules/schedule')

const { authenticator } = require('../middleware/auth')

router.use('/schedule', authenticator, schedule)
router.use('/users',  users)
router.use('/auth', auth)
router.use('/', authenticator, home)


module.exports = router