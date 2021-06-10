const express = require('express')
const app = express()
const cors = require('cors')
const auth = require('./middlewares/auth')

const mongoose = require('mongoose')
const connectionString = "mongodb+srv://anyone:justpassword@cluster0.hrts3.mongodb.net/database-tugas?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const userRouter = require('./routers/users')
const todoRouter = require('./routers/todos')

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) throw err
  console.log("Connect to Database...")
})

app.use(userRouter)
app.use(auth, todoRouter)

app.listen(3000)