const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const initializeRoutes = require('./routes-init');
const responseLogger = require('../src/middlewares/response-logger');
const errorLogger = require('../src/middlewares/error-logger');
const setHeaders = require('../src/middlewares/set-headers');


const createServer = async function (logger) {
    //support of application/json type post data
    app.use(bodyParser.json());
    //support of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(setHeaders);
    app.use(responseLogger(logger));
    await initializeRoutes(app);
    app.use(errorLogger(logger));
    return app;
}

module.exports = createServer;