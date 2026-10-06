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
            type:String
        },
        age:{
            type:Number
        },
       
    },
     relations:{
            tasks:{
                type:'one-to-many',
                target:'tasks',
                inverSide:'user'
            }
        }
})
module.exports=userSchema