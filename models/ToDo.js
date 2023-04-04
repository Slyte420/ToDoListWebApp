const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'must provide name'], trim: true, maxlength: [20, 'name can not be more than 20 characters'] }, completed: Boolean
})

module.exports = mongoose.model('ToDoList', ToDoSchema)