require('dotenv').config({
    path:'../.env'
})
const jwt=require('jsonwebtoken')
function auth(req,res,next){
    try {
        const authorization =req.headers.authorization
        if(!authorization){
            return res.status(401).json({
                message:'token is required'
            })
        }
        const token =authorization.split(' ')
         if (token.length !== 2 || token[0] !== 'Bearer' || !token[1]) {
            return res.status(401).json({
                message: 'invalid authorization format'
            });
        }
        req.user=jwt.verify(token[1],process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(500).json({
            serverError:error
        })
        
    }
}
module.exports=auth