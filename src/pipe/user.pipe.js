// Import Modules
const joi = require('joi');

// Define Create User Pipe
const createUserPipe = joi.object({
    nama: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
});

// Define Edit User Pipe
const editUserPipe = joi.object({
    nama: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().optional().allow(null),
    status: joi.number().required(),
});

// Export All User Pipe
module.exports = {
    createUserPipe,
    editUserPipe,
};
