const TaskRepository = require('../repositories3/task.repo')

class TaskService {
    constructor() {
        this.taskRepository = new TaskRepository()
    }

    async createTask(taskData, userId) {
        return this.taskRepository.createTask(taskData, userId)
    }

    async getTasks(userId) {
        return this.taskRepository.findByUserId(userId)
    }

    async updateTask(taskId, userId, taskData) {
        const task = await this.taskRepository.updateTask(taskId, userId, taskData)
        if (!task) {
            const error = new Error('Task not found')
            error.statusCode = 404
            throw error
        }
        return task
    }

    async deleteTask(taskId, userId) {
        const task = await this.taskRepository.deleteTask(taskId, userId)
        if (!task) {
            const error = new Error('Task not found')
            error.statusCode = 404
            throw error
        }
        return task
    }
}

module.exports = TaskService
