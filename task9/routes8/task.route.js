const express = require('express')
const taskController = require('../controllers6/task.controller')
const auth = require('../middleware7/auth')
const validate = require('../middleware7/validate')
const { createTaskSchema, updateTaskSchema } = require('../validator5/task.validator')

const router = express.Router()

router.use(auth)
router.get('/', taskController.list)
router.post('/', validate(createTaskSchema), taskController.create)
router.patch('/:id', validate(updateTaskSchema), taskController.update)
router.delete('/:id', taskController.remove)

module.exports = router
