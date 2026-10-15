const express=require('express')
const router=express.Router()
const data=require('../db')
const auth=require('../middleware/auth')
const postRepo=data.getRepository('post')
router.post('/',auth,async(req,res)=>{
    try {
        const {title,content}=req.body
        if(!title&& !content){
            return res.status(400).json({
                message:'title and content are required'
            })
        }
        const post=postRepo.create({
            title,content,user:{id:req.user.id}
        })
        await postRepo.save(post)
        return res.status(201).json({
            message:`${req.user.username} created new post`,
            post:post
        })
       
        
    } catch (error) {
        res.status(500).json({
             serverError:error
        })
       
        
    }

})
module.exports=router