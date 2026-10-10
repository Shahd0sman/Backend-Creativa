const {EntitySchema}=require('typeorm')
const userSchema=new EntitySchema({
    name:'user',
    tableName:'users',
    columns:{
        id:{
            primary:true,
            type:Number,
            generated:true
        },
        name:{
            type:String,
            unique:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            
        }
       
    },
     relations:{
            tasks:{
                type:'one-to-many',
                target:'task',
                inverseSide:'user'
            }
        }
})
module.exports=userSchema