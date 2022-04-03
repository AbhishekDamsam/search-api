const mongoClient = require('mongodb').MongoClient;

let internals = {};

async function connect(mongoURL, logger) {
    try {
        const client = await mongoClient.connect(mongoURL);
        internals.mongodb = client.db();
        logger.info('Mongodb is connected');
        internals.mongoClient = client;
    }
    catch(e){
        logger.error('Error connecting mongodb: ' + e.message);
        throw e;
    }
}

function get() {
    return internals.mongodb;
}

function close() {
    internals.mongoClient.close();
}

module.exports = {
    connect,
    get,
    close
};