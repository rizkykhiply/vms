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

// Import Configs
const { swaggerRouter } = require('./configs/swagger');

// Environments API
const PROGRAM_PORT = process.env.PROGRAM_PORT;
const PROGRAM_NAME = process.env.PROGRAM_NAME;
const UPLOAD_FILE = process.env.UPLOAD_FILE;

// Init Express
const app = express();

// Middleware API
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(swaggerRouter);
app.use('/api/vms/image', express.static(`${appRoot}/..${UPLOAD_FILE}`));
app.use('/api/vms', router);

// Middleware Routes Error
app.use(globalRoutes);

// Middleware Response Error
app.use(globalError);

// Listening API
app.listen(PROGRAM_PORT, () => console.log(`${PROGRAM_NAME} running on port ${PROGRAM_PORT}`));
