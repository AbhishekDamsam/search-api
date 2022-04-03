
const joiValidation = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        const valid = error == null;
        if (valid) { next(); }
        else {
            const { details } = error;
            // Extract all failed validation fields
            const messages = details.map(i => {
                return {
                    field: i.path[0],
                    message: i.message
                }
            });
            return res.status(422).json({ 
                code: 1,
                msg: 'Validation failed',
                errors: messages 
            })
        }
    }
}

module.exports = joiValidation;