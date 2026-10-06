const {Pool}=require('pg')
const pool=new Pool({
    host:"localhost",
    port: 5432,
    database: "postgres",
    user:"postgres",
    password:'1222005'
})
module.exports=pool