const db = require('./src/db-connect');
const server = require('./src/app');
const config = require('./config');
const Logger = require('./src/logger').Logger;

const PORT = config.PORT;
const mongoURL = config.mongoURL;

process.on('unhandledRejection', (err) => {
    Logger.error(err);
    process.exit(1);
});

process.on('uncaughtException', function(err) {
    Logger.error(err);
})

const start = async function () {
    await db.connect(mongoURL, Logger);
    const app = await server(Logger);
    app.listen(PORT, function () {
        //To display in terminal for developers
        console.log(`Express server listening on port http://localhost:${PORT}`);
        Logger.info(`Express server listening on port http://localhost:${PORT}`);
    });
}

start();
