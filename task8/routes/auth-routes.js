const express=require('express')
const router=express.Router()
const {register,login}=require('../controllers/auth-controller')
const {registerZod,loginZod}=require('../validators/auth-validator')
const validate=require('../middleware/validate')
router.post('/register',validate(registerZod),register)
router.post('/login',validate(loginZod),login)
module.exports=router