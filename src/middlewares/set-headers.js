//Setting default Headers
const setHeaders = function (req, res, next) {
    res.header('Accept', 'application/json');
    next();
}

module.exports = setHeaders;