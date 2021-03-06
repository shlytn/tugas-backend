const express = require('express')
const router = express.Router()
const todoList = require('../models/todo-schema')

router.post('/todo', async (req, res) => {
  const deskripsi = req.body.deskripsi

  let todo = new todoList({
    deskripsi: deskripsi
  })

  await todo.save()
  .then(data => {
    // res.status(200).redirect('/todo')
    res.status(200).json({ _id: data._id, deskripsi })
  })
  .catch(err => {
    res.status(404).json({ message: err})
  })
})

router.get('/todo', async (req, res) => {
  await todoList.find().select('-__v')
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.json({ message: err})
  })
})

router.delete('/todo/:id', async (req, res) => {
  let todo = await todoList.findByIdAndRemove(req.params.id)
  .then(result => {
    if(!result){
      return res.status(404).json({
        message: "List with Id" + req.params.id + "was not found"
      })
    }
    res.json(result)
  })
  .catch(err => {
    res.json({ message: err})
  })
})

module.exports = router