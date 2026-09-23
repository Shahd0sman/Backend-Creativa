const fs=require('fs')
let d1=null;
let d2=null;
const EventEmitter = require('events')
const myemitt=new EventEmitter();
 myemitt.on('fileready',(d1,d2) => {
       const merged = `${d1} and ${d2}`
       console.log (`two files are done and merged`)
       fs.writeFile('data3.txt',merged,'utf8',(err)=>{
        if (err){
            console.log(err)
        }
        console.log(`this is from data3 and these are the merged files :${merged}`)
       })

    })

fs.readFile('data1.txt','utf8',(err,data1)=>{
    if (err){
    console.log(err)
}
    console.log(data1)
    d1=data1
    if(d1 !==null&&d2 !==null){
 myemitt.emit('fileready',d1,d2)
}

   })

fs.readFile('data2.txt','utf8',(err,data2)=>{
    if(err){
        console.log(err)
    }
    console.log(data2)
    d2=data2
    if(d1 !==null && d2 !==null){
 myemitt.emit('fileready',d1,d2)
}
})



module.exports= myemitt
