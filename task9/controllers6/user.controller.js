const UserService = require('../services4/user.service')

const userService = new UserService()

async function register(req, res, next) {
    try {
        const user = await userService.register(req.body)
        return res.status(201).json({ message: 'User registered', user })
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next) {
    try {
        const result = await userService.login(req.body)
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}

module.exports = { register, login }
