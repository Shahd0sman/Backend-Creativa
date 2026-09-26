const http=require('http');
const fs=require('fs');

const server =http.createServer((req,res)=>{
    console.log(req.method, req.url);
res.statusCode=200;
res.setHeader('Content-Type','application/json')
////////////////////////////////////////////////
//front-with-AI
const origin=req.headers.origin;
if(origin==='http://127.0.0.1:5500'){
    //cors
    res.setHeader('Access-Control-Allow-Origin',origin);
}
if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.end()}
////////////////////////////////////////////////////////
//GET
if(req.url==='/users'&&req.method==='GET'){
    //read till the end
    const users=fs.readFileSync('./users.txt','utf8')//utf8 data=>string
    console.log(users)
   return res.end(users);
}

if(req.url==='/products'&& req.method==='GET'){
    const products=fs.readFileSync('./product.txt','utf8')
    return res.end(products)
}
//POST
if(req.url==='/users'&& req.method==='POST'){
    let body='';
    req.on('data',(chunk)=>{//parts
        body+=chunk.toString()//buffer to string
    })
    req.on('end',()=>{
        console.log(`Body:${body}`)
        const newuser=JSON.parse(body)//full string to json
        console.log(`Newuser:${newuser}`)
        const oldusers=fs.readFileSync('./users.txt','utf8')
        //قرات عشان ميمسحش القديم بل يزود عليه
        const users=JSON.parse(oldusers)
        users.push(newuser)//حجزت مكان للجديد
        fs.writeFileSync('./users.txt',
            JSON.stringify(users))
            console.log(`User added:${users}`)
       res.end(JSON.stringify({
        message:'user added',//to send to front
        user:newuser }))
    });

         return
        }
if(req.url==='/products'&&req.method==='POST'){
    let body=''
    req.on('data',(chunk)=>{
        body+=chunk.toString()})
    req.on('end',()=>{
        console.log(body)
        const newproduct=JSON.parse(body)
        console.log(newproduct)
        const oldproducts=fs.readFileSync('./product.txt','utf8')
        const products=JSON.parse(oldproducts)
        products.push(newproduct)
        fs.writeFileSync('./product.txt',
            JSON.stringify(products))
       res.end(JSON.stringify({
        message:'product added',
        product:newproduct}))})}
        return
})


server.listen(5000,()=>{
     console.log('server link is: http://localhost:5000')
})

