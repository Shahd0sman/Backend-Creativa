const jwt=require('jsonwebtoken')
require('dotenv').config()
function auth(req,res,next){
    try {
        const auth_header=req.headers.authorization
        if(!auth_header){
         res.status(401).json({
                message:'access denied'
            })
        }
        const token=auth_header.split('')[1]
        if(!token){
            res.status(401).json({
                message:'invalid authorization format'
            })
        }
        const decoded=jwt.verify(
            token,process.env.JWT_SECRET
        )
        req.user=decoded
        next()
    } catch (error) {
        res.status(500).json({
            serverError:error
        })
        
    }
}
module.exports=auth