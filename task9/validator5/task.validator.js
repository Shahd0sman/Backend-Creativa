const { z } = require('zod')

const taskFields = {
    title: z.string().trim().min(1).max(255),
    deadline: z.coerce.date(),
    priority: z.string().trim().min(1).max(50).nullable().optional(),
    category: z.string().trim().min(1).max(100).nullable().optional(),
    status: z.string().trim().min(1).max(50).nullable().optional()
}

const createTaskSchema = z.object({
    title: taskFields.title,
    deadline: taskFields.deadline,
    priority: taskFields.priority,
    category: taskFields.category,
    status: taskFields.status
})

const updateTaskSchema = z.object(taskFields).partial().refine(
    (task) => Object.keys(task).length > 0,
    { message: 'Provide at least one field to update' }
)

module.exports = { createTaskSchema, updateTaskSchema }
