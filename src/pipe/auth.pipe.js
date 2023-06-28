// Import Modules
const joi = require('joi');

// Define Auth Login Pipe
const authLoginPipe = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
});

// Export All Auth Pipe
module.exports = { authLoginPipe };
