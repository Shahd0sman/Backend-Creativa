const data=require('./db')
const express=require('express')
const app=express()
app.use(express.json())
 async function start(){
await data.initialize()
const userRepo = data.getRepository('user')
const tasksRepo=data.getRepository('task')
   app.listen(5000, () => {
        console.log('link http://localhost:5000')
    })

    app.get('/user/:email',async(req,res)=>{
  const email=req.params.email
  const user=await userRepo.findOneBy({
      email:email
  })
  if(!user){
    return res.status(404).json({
      message:'user not found'
    })
  }
   console.log(user)
  const tasks = await tasksRepo.find({
    where:{
      user:{
        id:user.id
      }
    }
   
  })
  console.log(tasks)
  if(tasks.length===0){
    return res.status(404).json({
      message:"no tasks yet for this user"
    })
  }
  res.status(200).json({tasks})


})
app.post('/user',async(req,res)=>{
    const user=userRepo.create({
        name:req.body.name,
        email:req.body.email
    })
    const save=await userRepo.save(user)
    res.status(201).json({
        message:'user added',
        user:save
    })
})
app.post('/user/:id/tasks',async(req,res)=>{
  const userid=req.params.id
  const user=await userRepo.findOneBy({
    id:userid})
  if(!user){
    return res.status(404).json({
      message:'user not found'
    })
  }
  const task=tasksRepo.create({
    title:req.body.title,
    deadline: req.body.deadline,
    category: req.body.category,
    priority: req.body.priority,
    status: req.body.status,
    user:user
  })
  const save=await tasksRepo.save(task)
  res.status(201).json({
    message:'task added'
  })


})
 }
    start()