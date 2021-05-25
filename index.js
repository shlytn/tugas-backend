const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const connectionString = "mongodb+srv://anyone:justpassword@cluster0.hrts3.mongodb.net/database-tugas?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

const todoRouter = require('./routers/todos')

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) throw err
  console.log("Connect to Database...")
})

app.get('/', (req, res) => {
  res.send(`<html>
    <body>
      <form action="/todo" method="post">
        <input name="deskripsi" />
        <button>Add</button>
      </form>
    </body>
  </html>`)
})

app.use(todoRouter)

app.listen(3000)