// Define All Constant
const PROGRAM_PORT = process.env.PROGRAM_PORT;
const PROGRAM_NAME = process.env.PROGRAM_NAME;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const DATABASE_NAME = process.env.DATABASE_NAME;
const REDIS_HOST = process.env.REDIS_HOST;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const UPLOAD_FILE = process.env.UPLOAD_FILE;
const UPLOAD_URL = process.env.UPLOAD_URL;

// Export All Constant
module.exports = {
    PROGRAM_PORT,
    PROGRAM_NAME,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASS,
    DATABASE_NAME,
    REDIS_HOST,
    JWT_SECRET_KEY,
    UPLOAD_FILE,
    UPLOAD_URL,
};
