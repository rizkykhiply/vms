// Import Config
const { IS_DEVELOPMENT } = require('../constant.conf');
const { loggerDev } = require('./logger.dev');
const { loggerProd } = require('./logger.prod');

// Define Logger
const logger = IS_DEVELOPMENT ? loggerDev : loggerProd;

// Export Logger
module.exports = {
    logger,
};
