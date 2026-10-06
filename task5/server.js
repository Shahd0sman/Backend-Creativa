const express = require('express')
const pool = require('./db')
const app = express()
app.use(express.json())
console.log('run')
    pool.query('SELECT * FROM public.users')
    .then(result => {
        console.log('USERS:', result.rows)
    })
    .catch(err => {
        console.log('USERS ERROR:', err)
    })
    
app.get('/users/:name', async (req, res) => {
    const {name}=req.params
    const r = await pool.query(`SELECT tasks.title,tasks.status FROM tasks JOIN users ON tasks.userid=users.id WHERE users.name = $1`,[name]) 
        if (r.rows.length===0){
            res.status(404).json({
                message:'no tasks for this user'
         } )
        }else{
        res.status(200).json({
            message: 'user tasks is:',
            data: r.rows
        })
    } 
})
app.post('/users',async(req,res)=>{
    const {name,email}=req.body
    const r = await pool.query('INSERT INTO users(name,email) VALUES($1,$2) RETURNING*',[name,email])
    res.status(201).json({
        message:`user added`,
        user:r.rows
    })
})
app.post('/users/:userid/tasks', async (req, res) => {
    try{
        const {userid}=req.params
        const {title,category,priority,status}=req.body
        const r=await pool.query('INSERT INTO tasks(title,category,priority,status,userid) VALUES ($1,$2,$3,$4,$5) RETURNING *'
            ,[title,category,priority,status,userid])

             res.status(201).json({
            message:`${userid}'s task added`,
            user:r.rows
        })
    }catch(error){
        console.log(error)
         res.status(500).json({
            message: 'Database error'
        })
    }
    
       
    })

app.listen(6000, () => {
    console.log('Server link: http://localhost:6000')
})


