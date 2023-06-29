// Import Modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConf = require('./swagger.conf.json');

// Define Swagger
const swaggerRouter = express.Router();

// Grouping Swagger Route
swaggerRouter.use('/api/docs', swaggerUi.serve);
swaggerRouter.get('/api/docs', swaggerUi.setup(swaggerConf));

// Export Swagger
module.exports = {
    swaggerRouter,
};
