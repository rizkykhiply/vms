// Import Modules
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');

// Import Config
const { PROGRAM_NAME } = require('../constant.conf');

// Define Logger Transports
const loggerTransport = {
    combine: new DailyRotateFile({
        level: 'http',
        filename: `${appRoot}/../logs/${PROGRAM_NAME}/combine/%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        frequency: '1h',
    }),
    error: new DailyRotateFile({
        level: 'error',
        filename: `${appRoot}/../logs/${PROGRAM_NAME}/error/%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        frequency: '1h',
    }),
    console: new winston.transports.Console(),
};

// Export Logger Transports
module.exports = {
    loggerTransport,
};
