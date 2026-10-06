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
        title:{
            type:String
        },
        deadline:{
            type:Date
        },
         priority:{
            type:String,
            nullable:true
        }
        ,
        category:{
            type:String,
            nullable:true
        },
        status:{
            type:String,
            nullable:true
        }
},
  relations:{
            user:{
                type:'many-to-one',
                target:'user',
                inverseSide:'task',
                 joinColumn: {
                name: 'userid'
            }
            }}
        })
module.exports=taskSchema