const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongooseStringQuery = require('mongoose-string-query')
const shortid = require('shortid')

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&')

const TodoSchema = new mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate()
  },
  task: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'done', 'in progress', 'overdue'],
    default: 'pending'
  }
}, {
  minimize: false
})

TodoSchema.plugin(timestamps)
TodoSchema.plugin(mongooseStringQuery)

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo
