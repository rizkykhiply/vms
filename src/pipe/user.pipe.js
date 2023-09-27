// Import Modules
const joi = require('joi');

// Define Create User Pipe
const createUserPipe = joi.object({
    idAccess: joi.number().required(),
    nama: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
});

// Define Edit User Pipe
const editUserPipe = joi.object({
    idAccess: joi.number().required(),
    nama: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().optional().allow(''),
    status: joi.number().required(),
});

// Export All User Pipe
module.exports = {
    createUserPipe,
    editUserPipe,
};
