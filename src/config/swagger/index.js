const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerConf = require('./swagger.conf.json');

const swaggerRouter = express.Router();

swaggerRouter.use('/api/docs', swaggerUi.serve);
swaggerRouter.get('/api/docs', swaggerUi.setup(swaggerConf));

module.exports = { swaggerRouter };
