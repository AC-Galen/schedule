const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const Todo = require('../../models/todo')


router.get('/new', async (req, res) => {
  try {
    res.render('new')
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const schedule = req.body
    schedule.userId = req.user._id
    await Schedule.create(schedule)
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user._id  //使用者id
    const _id = req.params.id    //schedule的id(點詳細資料進去時取得的)
    const ScheduleData = await Schedule.find({ _id, userId }).lean()
    const TodoData = await Todo.find({ _id, userId }).lean()   
    return res.render('detail', { ScheduleData, TodoData })
  } catch(err) {
    console.log(err)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const schedule = await Schedule.findById(_id).lean()
    res.render('edit', { schedule })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    let schedule = await Schedule.findById(_id)
    schedule = Object.assign(schedule, req.body)
    console.log(schedule)
    await schedule.save()
    res.redirect(`/schedule/${_id}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id/delete', async(req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const schedule = await Schedule.findOne({ _id, userId })
    await schedule.remove()
    res.redirect('/')
  }catch (err) {
    console.log(err)
  }
})



//拿到新增todo 頁面
router.get('/todos/new', async (req, res) => {
  try {
    res.render('todo')
  } catch (err) {
    console.log(err)
  }
})

//新增todo資料到schedule的detail頁面
router.post('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const todo = req.body
    todo.userId = req.user._id
    await Todo.create(todo)
    res.redirect('/')
  } catch(err) {
  console.log(err)
  }
})


module.exports = router