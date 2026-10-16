const data = require('../db2')

class TaskRepository {
    get task() {
        return data.getRepository('task')
    }

    async findByUserId(userId) {
        return this.task.find({
            where: {
                user: { id: userId }
            }
        })
    }

    async createTask(taskData, userId) {
        const task = this.task.create({
            ...taskData,
            user: { id: userId }
        })

        return this.task.save(task)
    }

    async updateTask(taskId, userId, taskData) {
        const task = await this.task.findOne({
            where: {
                id: taskId,
                user: { id: userId }
            }
        })

        if (!task) {
            return null
        }

        const updatedTask = { ...task, ...taskData }
        return this.task.save(updatedTask)
    }

    async deleteTask(taskId, userId) {
        const task = await this.task.findOne({
            where: {
                id: taskId,
                user: { id: userId }
            }
        })

        if (!task) {
            return null
        }

        return this.task.remove(task)
    }
}

module.exports = TaskRepository
