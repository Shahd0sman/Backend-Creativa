const {z}=require('zod')
const registerZod=z.object({
    username:z.string().trim().min(3).max(50),
    email:z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(255),
    password:z.string().min(8).max(72)
})
const loginZod=z.object({
    email:z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(255),
    password:z.string().min(8).max(72)
})
module.exports={registerZod,loginZod}