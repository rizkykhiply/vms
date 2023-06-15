// Import Modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import Models
const { models } = require('../models');

// Define JWT Secret Key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Define Auth Login Controller
module.exports.authLoginController = async (req, res, next) => {
    try {
        const getUsername = req.body.username;
        const getPassword = req.body.password;

        if (!getUsername || !getPassword) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Bad Request',
            });
        }

        const getUser = await models.userModels.getUser(getUsername);

        if (!getUser) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Username or password invalid',
            });
        }

        const getId = getUser.id;
        const getName = getUser.nama;
        const getPass = getUser.password;
        const getMatching = await bcrypt.compare(getPassword, getPass);

        if (!getMatching) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Username or password invalid',
            });
        }

        const getAccessToken = jwt.sign(
            {
                id: getId,
                nama: getName,
            },
            JWT_SECRET_KEY,
            { expiresIn: 300 },
        );

        return res.status(201).send({
            statusCode: 201,
            message: 'Success',
            data: {
                access_token: getAccessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};
