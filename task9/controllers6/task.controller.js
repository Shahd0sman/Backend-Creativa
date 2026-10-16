const TaskService = require('../services4/task.service')

const taskService = new TaskService()

function parseTaskId(value) {
    const taskId = Number(value)
    if (!Number.isSafeInteger(taskId) || taskId < 1) {
        const error = new Error('Task id must be a positive integer')
        error.statusCode = 400
        throw error
    }
    return taskId
}

async function list(req, res, next) {
    try {
        const tasks = await taskService.getTasks(req.user.id)
        return res.status(200).json({ tasks })
    } catch (error) {
        return next(error)
    }
}

async function create(req, res, next) {
    try {
        const task = await taskService.createTask(req.body, req.user.id)
        return res.status(201).json({ message: 'Task created', task })
    } catch (error) {
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const task = await taskService.updateTask(
            parseTaskId(req.params.id),
            req.user.id,
            req.body
        )
        return res.status(200).json({ message: 'Task updated', task })
    } catch (error) {
        return next(error)
    }
}

async function remove(req, res, next) {
    try {
        await taskService.deleteTask(parseTaskId(req.params.id), req.user.id)
        return res.status(200).json({ message: 'Task deleted' })
    } catch (error) {
        return next(error)
    }
}

module.exports = { list, create, update, remove }
