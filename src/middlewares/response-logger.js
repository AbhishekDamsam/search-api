//Log before sending the response
const responseLogger = function (logger) {
    return function (req, res, next) {
        res.on("finish", function () {
            logger.info(`[${new Date().toISOString()}] ${req.method}:${req.url} ${res.statusCode}`);
        });
        next();
    }
};

module.exports = responseLogger;