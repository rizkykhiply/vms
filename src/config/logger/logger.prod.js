// Import Modules
const winston = require('winston');

// Import Transport
const { loggerTransport } = require('./transport');

// Desctructuring Modules
const { createLogger, format } = winston;
const { combine, timestamp, errors, json } = format;

// Define Logger Production
const loggerProd = createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
    transports: [loggerTransport.combine, loggerTransport.error],
});

// Export Logger Production
module.exports = {
    loggerProd,
};
