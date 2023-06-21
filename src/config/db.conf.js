// Import Modules
const mysql = require('mysql2');

// Define Connection Pool Database
const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    enableKeepAlive: true,
    waitForConnections: true,
});

// Define Get Connection Database
connection.getConnection((error, connection) => {
    if (error) {
        console.log(`database connection ${error}`);
    }
    if (connection) {
        console.log(`database connected`);
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

module.exports = { baseQuery };
