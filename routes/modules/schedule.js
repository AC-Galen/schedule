const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const Todo = require('../../models/todo')

//新增
router.get('/new', async (req, res) => {
  try {
    const todos = await Todo.find().lean()
    res.render('new', {todos})
  } catch {
    console.log(err)
  }
})


//首頁
router.post('/', async (req, res) => {
  try {
    const schedule = req.body
    schedule.userId = req.user._id
    await Schedule.create(schedule)
    res.redirect('/')
  } catch {
    console.log(err)
  }
})

//編輯資料頁面  拿取schedule和todo的資料
router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const schedule = await Schedule.findById(_id).lean()
    const todo = await Todo.findById(_id).lean()
    res.render('edit', { schedule, todo })
  } catch(err) {
    console.log(err)
  }
})

//修改schedule頁面
router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    let schedule = await Schedule.findById(_id)
    schedule = Object.assign(schedule, req.body)
    await schedule.save()
    res.render('/')
  } catch {
    console.log(err)
  }
})



//刪除頁面
router.delete('/:id/delete', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Schedule.findOne({ _id, userId })
      .then(schedule => schedule.remove())
      .then(() => res.redirect('/'))
      .then(err => console.log(err))
})


module.exports = router