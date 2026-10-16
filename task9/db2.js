const path = require('node:path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const { DataSource } = require('typeorm')
const user = require('./entities1/users')
const task = require('./entities1/tasks')

const data = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user, task],
    synchronize: true
})

module.exports = data
