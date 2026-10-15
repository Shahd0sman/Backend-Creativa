require('dotenv').config({
    path:'../.env'
})
const {DataSource}=require('typeorm')
const user=require('./entities1/user')
const task=require('./entities1/tasks')
const data=new DataSource({
    type:process.env.DB_TYPE,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:[user,task],
    synchronize:true
})
console.log(process.env.DB_TYPE)
module.exports=data






