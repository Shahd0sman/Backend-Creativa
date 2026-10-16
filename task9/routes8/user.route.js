const express = require('express')
const userController = require('../controllers6/user.controller')
const validate = require('../middleware7/validate')
const { registerSchema, loginSchema } = require('../validator5/user.validator')

const router = express.Router()

router.post('/register', validate(registerSchema), userController.register)
router.post('/login', validate(loginSchema), userController.login)

module.exports = router
