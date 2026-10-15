const data = require('../db')
class taskRepo {
    constructor() {
        this.task = data.getRepository('task')
    }
    async findbyUserId(userId) {
        return await this.task.find({where:{
            user:{
                id:userId
            }
        }})
    }
    async update(id,updatedata) {
        return await this.task.update(id,updatedata)
    }
    async delete(id) {
        return await this.task.delete({id})
    }



}
module.exports = taskRepo