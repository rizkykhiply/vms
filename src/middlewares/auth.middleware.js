// Import Modules
const jwt = require('jsonwebtoken');

// Define JWT Secret Key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Define Auth Middleware
const authMiddleware = (req, res, next) => {
    try {
        const getAuthorization = req.header('Authorization');
        const getToken = getAuthorization?.split(' ')?.[1];

        if (!getToken) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized',
            });
        }

        const getDecode = jwt.verify(getToken, JWT_SECRET_KEY);

        if (!getDecode) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized',
            });
        }

        req.user = getDecode;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
};

// Export Auth Middleware
module.exports = { authMiddleware };
