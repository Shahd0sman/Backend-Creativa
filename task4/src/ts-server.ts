const express=require('express')
const fs=require('fs')
const app=express()
app.use(express.json())
///////////////////////////
//set types
type user={
    id:number,
    name:string,
    age:number
}
type request=import ('express').Request;
type response=import ('express').Response;
////////////////////////////
//get
app.get('/user',(req:request,res:response)=>{
   const read:string=fs.readFileSync('./node.json','utf8')
   const users:user[]=JSON.parse(read)
   if(users.length===0){
    return res.status(404).json({
       message:'no users'
    })
   }
   res.status(200).json(users)
})
////////////////////////////////////
//post
app.post('/user',(req:request,res:response)=>{
      const read:string=fs.readFileSync('./node.json','utf8')
      const users:user[]=JSON.parse(read)
   let newid
   if(users.length===0){
    newid=1
   }else{
    newid=users[users.length-1]?.id!+1
   }
 const newuser ={
    id:newid,
    name:req.body.name,
    age:req.body.age
 }
 users.push(newuser)
 fs.writeFileSync('./node.json',JSON.stringify(users))
 res.status(200).json({
    message:'user added',
    user:newuser
 })
})
///////////////////////
//put
app.put('/user/:id',(req:request,res:response)=>{
   const read:string=fs.readFileSync('./node.json','utf8')
   const users:user[]=JSON.parse(read)
   if(users.length===0){
    return res.status(404).json({
       message:'no users'
    })
   }
   const id=Number(req.params.id)
   const index=users.findIndex(user=>user.id===id)
    if(index===-1){
        return res.status(404).json({
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
    message:`user with id:${id} is updated`
   })
})

/////////////////////
//patch
app.patch('/user/:id',(req:request,res:response)=>{
   const read:string=fs.readFileSync('./node.json','utf8')
   const users:user[]=JSON.parse(read)
   if(users.length===0){
    return res.status(404).json({
       message:'no users'
    })
   }
   const id=Number(req.params.id)
   const index=users.findIndex(user=>user.id===id)
    if(index===-1){
        return res.status(404).json({
            message:'user not found'
        })
   }else{
    users[index]={...users[index],...req.body}
   }
   fs.writeFileSync('./node.json',JSON.stringify(users))
   res.status(200).json({
    message:`user with id:${id} is updated`
   })
})
/////////////////////////////////
//del
app.delete('/user/:id',(req:request,res:response)=>{
   const read:string=fs.readFileSync('./node.json','utf8')
   const users:user[]=JSON.parse(read)
   if(users.length===0){
    return res.status(404).json({
       message:'no users'
    })
   }
   const id=Number(req.params.id)
   const index=users.findIndex(user=>user.id===id)
    if(index===-1){
        return res.status(404).json({
            message:'user not found'
        })
   }else{
    users.splice(index)
   }
   fs.writeFileSync('./node.json',JSON.stringify(users))
   res.status(200).json({
    message:`user with id:${id} is deleted`
   })
})

app.listen(6000,()=>{
    console.log("link: http://localhost:6000")
})

