// Define Global Routes Middleware
const globalRoutes = (req, res, next) => {
    return res.status(404).send({
        statusCode: 404,
        message: 'Routes Not Found',
    });
};

// Define Global Error Middleware
const globalError = (error, req, res, next) => {
    if (error) {
        console.log(error);
    }
    return res.status(500).send({
        statusCode: 500,
        message: 'Internal Server Error',
    });
};

// Export All Error Middlewares
module.exports = { globalRoutes, globalError };
