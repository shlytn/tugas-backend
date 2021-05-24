const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const todoList = require('./model')
const connectionString = "mongodb+srv://anyone:justpassword@cluster0.hrts3.mongodb.net/database-tugas?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) throw err
  console.log("Connect to Database...")
})

app.post('/todo', async (req, res) => {
  let todo = new todoList({
    // _id: new mongoose.Types.ObjectId(),
    deskripsi: req.body.deskripsi
  })

  console.log(todo._id)

  await todo.save()
  .then(data => {
    // res.status(200).redirect('/todo')
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(404).json({ message: err})
  })
})

app.get('/todo', async (req, res) => {
  let todo = await todoList.find().select('-__v')
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.json({ message: err})
  })
})

app.delete('/todo/:id', async (req, res) => {
  let todo = await todoList.findByIdAndRemove(req.params.id)
  .then(result => {
    if(!result){
      return res.status(404).json({
        message: "List with Id" + req.params.id + "was not found"
      })
    }
  })
  .catch(err => {
    res.json({ message: err})
  })
})

app.listen(3000)