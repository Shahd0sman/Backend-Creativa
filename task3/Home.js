const http=require('http');
const fs=require('fs')
const path=require('path')

const usersFile=path.join(__dirname,'users.txt')
const productsFile=path.join(__dirname,'product.txt')

const server =http.createServer((req,res)=>{
res.statusCode=200;
res.setHeader('Content-Type','application/json')
const origin=req.headers.origin;
if(origin==='http://127.0.0.1:5500'||origin==='http://localhost:5500'){
    res.setHeader('Access-Control-Allow-Origin',origin);
}
res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
res.setHeader('Access-Control-Allow-Headers','Content-Type');

if(req.method==='OPTIONS'){
    return res.end();
}

if(req.url==='/users'&&req.method==='GET'){
    const data=fs.readFileSync(usersFile,'utf8')
   const users=JSON.parse(data)
   return res.end(JSON.stringify(users));
}

if(req.url==='/products'&& req.method==='GET'){
    const pdata=fs.readFileSync(productsFile,'utf8')
    const product=JSON.parse(pdata)
    return res.end(JSON.stringify(product))
}

if(req.url==='/users'&& req.method==='POST'){
    let body='';
    req.on('data',(chunk)=>{
        body+=chunk.toString()
    })
    req.on('end',()=>{
        console.log(body)
        const newuser=JSON.parse(body)
        console.log(newuser)
        const adduser=fs.readFileSync(usersFile,'utf8')
        const users=JSON.parse(adduser)
        users.push(newuser)
        fs.writeFileSync(usersFile,JSON.stringify(users,null,2))
       res.end(JSON.stringify({
        message:'user added',
        user:newuser
       })) 
    })

    return
}
})


server.listen(5000,()=>{
     console.log('server link is: http://localhost:5000')
})

