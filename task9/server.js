require('dotenv').config()
const express = require('express')
const data=require('./db')
const app = express()
app.use(express.json())
async function start() {
   await data.initialize()
   app.listen(process.env.PORT || 5000, () => {
      console.log('link http://localhost:5000')
   })
}
start()
