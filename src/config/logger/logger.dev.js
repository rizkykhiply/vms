// Import Modules
const winston = require('winston');

// Import Transport
const { loggerTransport } = require('./transport');

// Desctructuring Modules
const { createLogger, format } = winston;
const { combine, colorize, timestamp, printf, errors } = format;

// Define Logger Levels
const loggerLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define Logger Colors
const loggerColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Define Add Custom Colors
winston.addColors(loggerColors);

// Define Logger Format
const loggerFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    const getMeta = meta?.route;
    const getRoute = !getMeta ? 'main' : getMeta;

    return `${timestamp} [${getRoute}] ${level}: ${message || stack}`;
});

// Define Logger Development
const loggerDev = createLogger({
    levels: loggerLevels,
    level: 'http',
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), loggerFormat),
    transports: [loggerTransport.console],
});

// Export Logger Development
module.exports = {
    loggerDev,
};
