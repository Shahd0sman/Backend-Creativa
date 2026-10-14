const { log } = require('node:console')
const data = require('./db')
const express = require('express')
const app = express()
app.use(express.json())


async function start() {
    try {
        await data.initialize()
   app.listen(process.env.PORT || 5000, () => {
      console.log('link http://localhost:5000')
   })
        
    } catch (error) {
        console.log(`Database connection faild ${error}`)
    }
   

}
start()
