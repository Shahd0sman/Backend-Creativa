const {EntitySchema}=require('typeorm')
const userSchema=new EntitySchema({
    name:'user',//name of entity
    tableName:'users',
    columns:{
        id:{
            primary:true,
            type:Number,
            generated:true
        },
        name:{
            type:String
        },
        email:{
            type:String
        },
       
    },
     relations:{
            tasks:{
                type:'one-to-many',
                target:'task', //name of entity
                inverseSide:'user'
            }
        }
})
module.exports=userSchema