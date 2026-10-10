require('dotenv').config()
const data = require('./db')
const express = require('express')
const register = require('./auth/register')
const login = require('./auth/login')
const auth = require('./middleware/auth');
const task = require('./middleware/addtask');
const app = express()
app.use(express.json())
app.use(register)
app.use(login)
app.use(auth)
app.use(task)

async function start() {
   await data.initialize()
   const tasksRepo = data.getRepository('task')
   app.listen(process.env.PORT || 5000, () => {
      console.log('link http://localhost:5000')
   })
   task.get('/tasks', auth, async (req, res) => {
      try {
         const tasks = await tasksRepo.find({
            where: {
               user: {
                  id: req.user.id
               }
            }
         })
         if (!task) {
            res.status(404).json({
               message: 'no tasks yet'
            })
         }

         res.status(200).json({
            tasks: tasks
         });

      } catch (error) {
         return res.status(500).json({
            serverError: error
         })
      }
})
}
start()
