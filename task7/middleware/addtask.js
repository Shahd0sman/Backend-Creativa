const express=require('express')
const data=require('../db')
const auth = require('./auth');
const tasks = express.Router();
const tasksRepo = data.getRepository('task');
tasks.post('/tasks', auth, async (req, res) => {
    try {
        const { title, category, deadline, priority,status } = req.body;
        const task = tasksRepo.create({
            title,category,deadline,priority,status,
            user: {
                id: req.user.id
            }
        });
        await tasksRepo.save(task);
        return res.status(201).json({
            message: 'Task created successfully',
            task:title
        });

    } catch (error) {
        return res.status(500).json({
            serverError:error
        });
    }
})
module.exports = tasks;