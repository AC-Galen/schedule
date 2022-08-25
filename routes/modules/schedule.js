const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const Todo = require('../../models/todo')

//新增
router.get('/new', (req, res) => {
  return res.render('new')
})


//首頁


//編輯資料頁面


//讀取特定頁面



//刪除頁面
module.exports = router