const data=require('./db')
const express=require('express')
const app=express()
app.use(express.json())
await data.initialize()
const userRepo = data.getRepository('user')
const tasksRepo=data.getRepository('task')
app.get('/users/:id',(req,res)=>{
  const id=Number(req.params.id)
  const user= userRepo.findOneBy({id})
  res.status(200).json({
    message:'done',
    user:user
  })
})
app.post('./user',async(req,res)=>{
    const user=userRepo.create({
        name:req.body.name,
        age:req.body.age
    })
    const save=await userRepo.save(user)
    res.status(201).json({
        message:'user added',
        user:save
    })
})

    