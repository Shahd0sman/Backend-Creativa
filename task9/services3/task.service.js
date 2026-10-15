const taskRepo=require('../repositories2/task.repo')
const data=req.body
class taskService{
    constructor(){
        this.taskRepo=new taskRepo()
    }
    async createTask(data){

        
    }
    async getTask(){
        
    }
    async deleteTask(){

    }
    async updateTask(){

    }

}
module.exports=taskService