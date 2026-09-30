const express=require('express')
const fs=require('fs')
const app=express()
app.use(express.json())

//get
app.get('/user',(req,res)=>{
    const read=fs.readFileSync('./node.json','utf8')
    const users=JSON.parse(read)
          if(users.length===0){
           return res.status(404).json({
              message:"user list is empty"
            })
     
    }
    res.status(200).json(users)
})
////////////////////////////
//post
app.post('/user',(req,res)=>{
   const read=fs.readFileSync('./node.json','utf8')
   const oldusers=JSON.parse(read)
   let newid
   if(oldusers.length===0){
      newid=1
   }else{
    newid=oldusers[oldusers.length-1].id+1
 }
   const newuser={
    id:newid,
    name:req.body.name,
    age:req.body.age
}
   oldusers.push(newuser)
   fs.writeFileSync('./node.json',JSON.stringify(oldusers))
   res.status(201).json({
    message:'user added',
    users: oldusers 
})
   })
///////////////////////////////
//put
   app.put('/user/:id',(req,res)=>{//  /:id=>req.params
    const read=fs.readFileSync('./node.json','utf8')
     const users=JSON.parse(read)
           if(users.length===0){
           return res.status(404).json({
              message:"user list is empty"
            })
     
    }
    const id=Number(req.params.id)
    const index=users.findIndex(user=>user.id===id)
    
    if(index===-1){
        res.status(404).json({
            message:'user not found'
        })
    }else{
        users[index]={
            id:id,
            name:req.body.name,
            age:req.body.age
        }
    }
    fs.writeFileSync('./node.json',JSON.stringify(users))
    res.status(200).json({
        message:`user with id: ${id} updated`
    })
   })
//////////////////////////////////////
//patch
app.patch('/user/:id',(req,res)=>{
    const read=fs.readFileSync('./node.json','utf8')
     const users=JSON.parse(read)
           if(users.length===0){
           return res.status(404).json({
              message:"user list is empty"
            })
     
    }
    const id=Number(req.params.id)
    const index=users.findIndex(user=>user.id===id)
    
    if(index===-1){
        res.status(404).json({
            message:'user not found'
        })
    }else{
        users[index]={...users[index],...req.body}
    }
    fs.writeFileSync('./node.json',JSON.stringify(users))
    res.status(200).json({
        message:`user with id: ${id} updated`
    })
   })
///////////////////////////
//delete
app.delete('/user/:id',(req,res)=>{
    const read=fs.readFileSync('./node.json','utf8')
     const users=JSON.parse(read)
           if(users.length===0){
           return res.status(404).json({
              message:"user list is empty"
            })
     
    }
    const id=Number(req.params.id)
    const index=users.findIndex(user=>user.id===id)
    
    if(index===-1){
        res.status(404).json({
            message:'user not found'
        })
    }else{
        users.splice(index)
    }
    fs.writeFileSync('./node.json',JSON.stringify(users))
    res.status(200).json({
        message:`user with id: ${id} deleted`
    })

})
app.listen(5000,()=>{
    console.log('link:  http://localhost:5000')
})

   

   
