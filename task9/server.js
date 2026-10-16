const path = require('node:path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = require('./app')
const data = require('./db2')

async function start() {
    try {
        await data.initialize()
        const port = Number(process.env.PORT) || 5000
        return app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Failed to start task9:', error.message)
        process.exitCode = 1
    }
}

if (require.main === module) {
    start()
}

module.exports = { start }
