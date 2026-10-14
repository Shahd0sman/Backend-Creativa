const {EntitySchema}=require('typeorm')
const userSchema=new EntitySchema({
    name:'user',
    tableName:'client',
    columns:{
        id:{
            primary:true,
            type:Number,
            generated:true
        },
        username:{
            type:'varchar',
            nullable:false
        },
        email:{
            type:'varchar',
            unique:true,
            nullable:false
        },
        password:{
            type:'varchar',
            nullable:false
            
        },
        role:{
            type:'varchar',
            default:'user',
            nullable:false
        }
       
    },
     relations:{
            links:{
                type:'one-to-many',
                target:'link',
                inverseSide:'user'
            }
        }
})
module.exports=userSchema