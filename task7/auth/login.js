require('dotenv').config()
const jwt=require('jsonwebtoken')
const data = require('../db')
const bcrypt=require('bcrypt')
const express = require('express')
const login=express.Router()
const userRepo=data.getRepository('user')
    login.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userRepo.findOneBy({email})
            if (!user) {
                res.status(404).json({
                    message: "wrong email or password"
                })
            }
            const matching=await bcrypt.compare(password,user.password)
              if ( !matching) {
                res.status(404).json({
                    message: "wrong email or password"
                })
            }
            const token=jwt.sign(
                {id:user.id,email:user.email},
                    process.env.JWT_SECRET,
                    {expiresIn:'3h'}
                )
            res.status(200).json({
                message:`welcome ${user.name}`,
                token:token
            })
        } catch (error) {
            res.status(500).json({
                message: `server error: ${error}`
            })
        }
    })
module.exports=login