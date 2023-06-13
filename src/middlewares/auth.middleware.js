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

        console.log(getToken);

        const getDecode = jwt.verify(getToken, JWT_SECRET_KEY);

        if (!getDecode) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized',
            });
        }

        req.user = getDecode.id;

        next();
    } catch (error) {
        console.log(error);
        throw new Error('Token Failed');
    }
};

// Export Auth Middleware
module.exports = { authMiddleware };
