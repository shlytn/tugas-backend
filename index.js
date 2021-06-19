const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080'
  }
})

io.on('connection', (socket) => {
  console.log("Socket Connection Established with ID :"+ socket.id)
  socket.on('send-data', (data) => {
    socket.broadcast.emit('get-data', data)
  })
  socket.on('delete-data', (data) => {
    socket.broadcast.emit('data-deleted', data)
  })
})

const auth = require('./middlewares/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const mongoose = require('mongoose')
const connectionString = "mongodb+srv://anyone:justpassword@cluster0.hrts3.mongodb.net/database-tugas?retryWrites=true&w=majority"

const userRouter = require('./routers/users')
const todoRouter = require('./routers/todos')

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) throw err
  console.log("Connect to Database...")
})

app.use(userRouter)
app.use(auth, todoRouter)

server.listen(3000, () => {
  console.log('listening on localhost:3000')
})