function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error)
    }

    if (error.code === '23505' || error.driverError?.code === '23505') {
        return res.status(409).json({ message: 'A record with this value already exists' })
    }

    const statusCode = error.statusCode || error.status || 500
    const message = statusCode >= 500 ? 'Internal server error' : error.message
    return res.status(statusCode).json({ message })
}

module.exports = errorHandler
