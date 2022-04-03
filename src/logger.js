const { createLogger, transports, format, config } = require('winston');
const { combine, timestamp, label, printf } = format;

const Logger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './logs/logs.log'
        })
    ],
    format: combine(
        label({ label: `Label` }),
        timestamp(),
        printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
});

//This logger is used for testing using jest
const TestLogger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console()
    ],
    format: combine(
        label({ label: `Label` }),
        timestamp(),
        printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
});

module.exports = {
    Logger,
    TestLogger
};