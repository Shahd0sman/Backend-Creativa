const { z } = require('zod')

const email = z.string().trim().email().max(255).toLowerCase()
const password = z.string().min(8).refine(
    (value) => Buffer.byteLength(value, 'utf8') <= 72,
    { message: 'Password must be no more than 72 bytes' }
)

const registerSchema = z.object({
    username: z.string().trim().min(3).max(50),
    email,
    password
})

const loginSchema = z.object({
    email,
    password
})

module.exports = { registerSchema, loginSchema }
