// Import Modules
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const appRoot = require('app-root-path');

dotenv.config();

// Import Routes
const { router } = require('./routes');

// Import Middlewares
const { globalRoutes, globalError } = require('./middlewares/error.middleware');
const { morganMiddleware } = require('./middlewares/morgan.middleware');

// Import Config
const { UPLOAD_FILE, PROGRAM_PORT, PROGRAM_NAME } = require('./config/constant.conf');
const { swaggerRouter } = require('./config/swagger');
const { configQueue } = require('./config/bull');
const { loggerDev } = require('./config/logger/logger.dev');

// Import Consumer
const { createRegistrasiQueue } = require('./consumer/registrasi.consumer');

// Init Express
const app = express();

// Define Queues
const queues = [createRegistrasiQueue];
const getQueues = configQueue(queues);

// Middleware API
app.use(cors({ exposedHeaders: ['Content-Disposition'] }));
// app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(swaggerRouter);

// Grouping Queues API
app.use('/admin/queues', getQueues.getRouter());

// Grouping Static Image API
app.use('/api/vms/image', express.static(`${appRoot}/..${UPLOAD_FILE}`));

// Middleware Logger Http
app.use(morganMiddleware);

// Grouping API
app.use('/api/vms', router);

// Middleware Routes Error
app.use(globalRoutes);

// Middleware Response Error
app.use(globalError);

// Listening API
app.listen(PROGRAM_PORT, () => loggerDev.info(`${PROGRAM_NAME} running on port ${PROGRAM_PORT}`));
