// Import Modules
const joi = require('joi');

// Import Config
const { logger } = require('../config/logger');

// Define Validation Middleware
const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            const getBody = req.body;
            const getValidation = await schema.validateAsync(getBody, { abortEarly: false });

            req.body = getValidation;
            next();
        } catch (error) {
            if (error instanceof joi.ValidationError) {
                const { details } = error;
                logger.error(details[0]?.message);
                return res.status(400).send({
                    statusCode: 400,
                    message: details[0]?.message?.replace(/[^a-z0-9\s]/gi, '') || 'Bad Request',
                });
            }
            next(error);
        }
    };
};

// Export Validation Middleware
module.exports = {
    validationMiddleware,
};
