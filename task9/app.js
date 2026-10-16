const express = require('express')
const userRoutes = require('./routes8/user.route')
const taskRoutes = require('./routes8/task.route')
const errorHandler = require('./middleware7/errorhandler')

const app = express()

app.use(express.json())
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))
app.use('/api/auth', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use((req, res) => res.status(404).json({ message: 'Route not found' }))
app.use(errorHandler)

module.exports = app
