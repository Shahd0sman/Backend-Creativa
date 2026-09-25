const http=require('http');
const users=require('./users')
const products=require('./product')

const server =http.createServer((req,res)=>{
res.statusCode=200;
res.setHeader('Content-Type','application/json')
res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

if(req.url==='/users'&&req.method==='GET'){
   return res.end(JSON.stringify(users))
}

if(req.url==='/products'&& req.method==='GET'){
    return res.end(JSON.stringify(products))
}

})


server.listen(5000,()=>{
     console.log('server link is: http://localhost:5000')
})

