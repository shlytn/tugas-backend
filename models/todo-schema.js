const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  // _id : mongoose.Schema.Types.ObjectId,
  deskripsi: String
})

module.exports = mongoose.model('todoList', todoSchema)