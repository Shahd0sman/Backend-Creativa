const {DataSource}=require('typeorm')
const users=require('./user')
const tasks=require('./task')
const data= new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'1222005',
    database:'todo',
    entities:[users,tasks]
})
module.exports=data