const data=require('../db')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config({
    path:'../.env'
})
const userRepo=data.getRepository('user')
async function register(req,res){
    try {
        const {username,email,password}=req.body
        const find=await userRepo.findOneBy({email})
        if(find){
            return res.status(409).json({
                message:'email aleady exists'
            })
        }
        const salt= await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        const user=userRepo.create({username,email,password:hash})
        await userRepo.save(user)
        res.status(200).json({
            message:'user creates successfully'
        })
    } catch (error) {
        res.status(500).json({
            serverError:error
        })
        
    }
}
async function login(req,res){
    try {
        const {email,password}=req.body
        const find=await userRepo.findOneBy({email})
        if(!find){
            return res.status(401).json({
                message:'invaild email or password'
            })
        }
        const pass=await bcrypt.compare(password,find.password)
        if(!pass){
            return res.status(401).json({
                message:'invaild email or password'
            })
        }
        const token=jwt.sign({
            id:find.id,
        email:find.id,
        role:find.role
            },process.env.JWT_SECRET,{expiresIn:'3h'})
    return res.status(200).json({
      message:`welcome ${find.username}`,
      token,
    })
    } catch (error) {
        res.status(500).json({
            serverError:error
        })
    }
}
module.exports=register
module.exports=login