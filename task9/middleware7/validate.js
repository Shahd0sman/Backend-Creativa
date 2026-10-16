function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                message: 'Invalid request body',
                errors: result.error.issues.map(({ path, message }) => ({
                    field: path.join('.'),
                    message
                }))
            })
        }

        req.body = result.data
        next()
    }
}

module.exports = validate
