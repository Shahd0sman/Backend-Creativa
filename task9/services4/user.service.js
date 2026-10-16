const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserRepository = require('../repositories3/user.repo')

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async register({ username, email, password }) {
        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            const error = new Error('Email already exists')
            error.statusCode = 409
            throw error
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await this.userRepository.createUser({
            username,
            email,
            password: hashed
        })

        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    async login({ email, password }) {
        const user = await this.userRepository.findByEmail(email)
        const passwordMatches = user && await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            const error = new Error('Invalid email or password')
            error.statusCode = 401
            throw error
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured')
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )

        const { password: _, ...userWithoutPassword } = user
        return { token, user: userWithoutPassword }
    }
}

module.exports = UserService
