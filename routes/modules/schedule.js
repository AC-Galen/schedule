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
    const _id = req.params.id
    const userId = req.user._id
    const scheduleId = _id

    const ScheduleData = await Schedule.find({ _id, userId }).lean()
    const TodoData = await Todo.find({ scheduleId }).lean()

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
    await schedule.save()
    res.redirect(`/schedule/${_id}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const scheduleId = _id
    const schedule = await Schedule.findOne({ _id, userId })
    await Todo.find({ scheduleId }).deleteMany()
    await schedule.remove()
    res.redirect('/')
  }catch (err) {
    console.log(err)
  }
})


router.get('/:id/todos/new', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const ScheduleData = await Schedule.find({ _id, userId }).lean()
    res.render('todo-new', { ScheduleData })
  } catch (err) {
    console.log(err)
  }
})

router.post('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const todo = req.body
    todo.scheduleId = _id
    await Todo.create(todo)
    res.redirect(`/schedule/${_id}`)
  } catch(err) {
  console.log(err)
  }
})


router.get('/:id/todos/:todoid/edit', async (req, res) => {
  try {
    const _id = req.params.todoid
    const _schedule = req.params.id
    const TodoData = await Todo.find({ _id, _schedule }).lean()
    res.render('todo-edit', { TodoData })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id/todos/:todoid', async (req, res) => {
  try {
    const _id = req.params.todoid
    const _schedule = req.params.id
    const { isDone } = req.body
    let todo = await Todo.findById(_id)
    todo = Object.assign(todo, req.body)
    todo.isDone = isDone === "on"
    await todo.save()
    res.redirect(`/schedule/${_schedule}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id/todos/:todoid', async (req, res) => {
  try {
    const _id = req.params.todoid
    const _schedule = req.params.id
    const todo = await Todo.findOne({ _id })
    await todo.remove()
    res.redirect(`/schedule/${_schedule}`)
  } catch (err) {
    console.log(err)
  }
})
module.exports = router