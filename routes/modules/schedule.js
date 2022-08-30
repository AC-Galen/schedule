const express = require('express')
const router = express.Router()
const Schedule = require('../../models/schedule')
const Todo = require('../../models/todo')

//新增的頁面
router.get('/new', async (req, res) => {
  try {
    res.render('new')
  } catch (err) {
    console.log(err)
  }
})


//新增資料
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


//取得詳細頁面
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

//取得修改的頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const schedule = await Schedule.findById(_id).lean()
    res.render('edit', { schedule })
  } catch (err) {
    console.log(err)
  }
})


//修改schedule 資料
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


//刪除頁面
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





module.exports = router