const experss=require('express')
const fs=require('fs')
const app=experss();
app.use(experss.json());
type request=import("express").Request
type respose=import('express').Response
type users={
    id:number;
    name:string;
    age:number;
}

app.get('/users',(req:request,res:respose)=>{
     const readuser:string=fs.readFileSync('./node.json','utf8')
    const users:users[]=JSON.parse(readuser)
    res.status(200).json(users)
})
app.post('/users',(req:request,res:respose)=>{
    const readold:string=fs.readFileSync('./node.json','utf8')
    const user:users[]=JSON.parse(readold)
    const lastuser=user[user.length-1]!
    const newuser :users={
        id: lastuser? 1:lastuser+1,
        name:req.body.name,
        age:req.body.age
    }
    user.push(newuser)
    fs.writeFileSync('./node.json',JSON.stringify(user))
    res.status(201).json({
        message:'done',
        newuser:newuser
    })

})
app.listen(5000,()=>{
    console.log('link : http://localhost:5000')
})

