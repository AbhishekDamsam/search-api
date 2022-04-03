//Catch the errors thrown in the application
const errorLogger = function (logger) {
    return function (err, req, res, next) {
        const status = err.httpStatusCode || 500;
        const message = err.message || 'Something went wrong';
        logger.error(`[${new Date().toISOString()}] ${req.method}:${req.url} ${status} ${message}`);
        res.status(status).send({
            code: err.code,
            msg: message
        });
        next();
    }
}

module.exports = errorLogger;