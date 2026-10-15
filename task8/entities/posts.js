const { timeStamp } = require('node:console')
const {EntitySchema, JoinColumn}=require('typeorm')
const postSchema=new EntitySchema({
    name:'post',
    tableName:'posts',
    columns:{
        id:{
            primary:true,
            type:Number,
            generated:true
        },
        title:{
            type:String,
            nullable:false
        },
        content:{
            type:String,
            nullable:false
        },
        createdAt:{
            type:'timestamp',
            createDate:true
            
        },
        updatedat:{
            type:'timestamp',
            updateDate:true
        },
       
    },
     relations:{
            user:{
                type:'many-to-one',
                target:'user',
                inverseSide:'post',
                JoinColumn:{
                    name:'userId'
                }
            }
        }
})
module.exports=postSchema