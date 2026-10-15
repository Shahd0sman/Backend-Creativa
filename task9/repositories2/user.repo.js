const data = require('../db')
class userRepo {
    constructor() {
        this.user = data.getRepository('user')
    }
    async find() {
        return await this.user.find()
    }
    async update() {
        return await this.user.update()
    }
    async delete() {
        return await this.user.delete()
    }



}
module.exports = userRepo