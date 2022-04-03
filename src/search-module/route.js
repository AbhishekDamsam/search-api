const Handler = require('./handler');
const searchSchema = require('./joi-schema');
const validateRequestData = require('../middlewares/joi-validation');

async function searchRoute(app) {
    return new Promise(function (resolve, reject) {
        //body is harcoded while sending to validateRequestData() 
        //This param is used as key to extract from request object example req[body]
        app.post('/search', validateRequestData(searchSchema, 'body'), Handler.searchRecords);
        resolve();
    });
}

module.exports = searchRoute;