const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authorization = req.headers.authorization
    const [scheme, token, ...extra] = authorization ? authorization.split(' ') : []

    if (scheme !== 'Bearer' || !token || extra.length > 0) {
        return res.status(401).json({ message: 'A valid Bearer token is required' })
    }

    if (!process.env.JWT_SECRET) {
        return next(new Error('JWT_SECRET is not configured'))
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        return next()
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = auth
