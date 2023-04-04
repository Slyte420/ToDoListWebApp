const express = require('express')
const router = express.Router()

const { getAllToDos, createToDo, updateToDo, deleteToDo } = require('../controller/todos')
const { route } = require('express/lib/application')

router.route('/').get(getAllToDos).post(createToDo)
router.route('/:id').delete(deleteToDo).patch(updateToDo)
module.exports = router