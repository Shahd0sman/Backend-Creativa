const {EntitySchema}=require('typeorm')
const linksschema=new EntitySchema({
    name:'link',
    tableName:'links',
    columns:{
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        title:{
            type:'varchar',
            nullable:false
        },
        link:{
            type:'text',
            nullable:false
        },
        description:{
            type:'text',
            nullable:true
        },
        createdat:{
            type:'timestamp',
            default:()=>'current_timestamp'
        },
        category:{
            type:'text',
            nullable:true
        },
       
},
  relations:{
            user:{
                type:'many-to-one',
                target:'user',
                inverseSide:'link',
                 joinColumn: {
                name: 'userid'
            }
            }}
        })
module.exports=linksschema