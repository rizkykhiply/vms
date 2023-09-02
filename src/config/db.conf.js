// Import Modules
const mysql = require('mysql2');

// Import Config
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASS, DATABASE_NAME } = require('./constant.conf');
const { loggerDev } = require('./logger/logger.dev');

// Define Connection Pool Database
const connection = mysql.createPool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    enableKeepAlive: true,
    waitForConnections: true,
    connectionLimit: 100,
});

// Define Get Connection Database
connection.getConnection((error, connection) => {
    if (error) {
        loggerDev.error(`Database connection ${error}`);
    }
    if (connection) {
        loggerDev.info(`Database connected`);
        connection.release();
    }
});

// Define Base Query Database
const baseQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result) => {
            if (error) {
                reject(error);
            }
            return resolve(result);
        });
    });
};

// Export Base Query Database
module.exports = {
    baseQuery,
};
