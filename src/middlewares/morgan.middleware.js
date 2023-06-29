// Import Modules
const morgan = require('morgan');

// Import Config
const { logger } = require('../config/logger');

// Define Stream
const stream = {
    write: (message) => logger.http(message.trim(), { route: 'request' }),
};

// Define Morgan Middleware
const morganMiddleware = morgan(':remote-addr - :method :url - :status - :response-time ms', { stream });

// Export Morgan Middleware
module.exports = {
    morganMiddleware,
};
