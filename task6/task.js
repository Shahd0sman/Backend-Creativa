const {EntitySchema}=require('typeorm')
const taskSchema=new EntitySchema({
    name:'task',
    tableName:'tasks',
    columns:{
        id:{
            primary:true,
            type:Number,
            generated:true
        },
        name:{
            type:String
        },
         priority:{
            type:String,
            nullable:true
        }
},
  relations:{
            user:{
                type:'many-to-one',
                target:'users',
                inverSide:'task'
            }}
        })
module.exports=taskSchema