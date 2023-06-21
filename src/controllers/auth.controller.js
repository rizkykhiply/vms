// Import Modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import config
const { validateHashPassword } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define JWT Secret Key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Define Auth Login Controller
module.exports.authLoginController = async (req, res, next) => {
    try {
        const getUsername = req.body.username;
        const getPassword = req.body.password;

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
                username: getUsername,
            },
            JWT_SECRET_KEY,
            { expiresIn: 300 },
        );

        return res.status(201).send({
            statusCode: 201,
            message: 'Success',
            data: {
                access_token: getAccessToken,
                nama: getName,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Define Auth Logout Controller
module.exports.authLogoutController = async (req, res, next) => {
    try {
        const getUser = req.user;

        if (getUser) {
            return res.status(200).send({
                statusCode: 200,
                message: 'Success',
            });
        }
    } catch (error) {
        next(error);
    }
};

// Define Auth Register Controller
module.exports.authRegisterController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getNama = getBody.nama;
        const getUsername = getBody.username;
        const getPassowrd = getBody.password;

        const getUser = await models.userModels.getUser(getUsername);

        if (getUser) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Username already exists',
            });
        }

        const getHashPass = await validateHashPassword(getPassowrd);

        await models.userModels.createUser({
            nama: getNama,
            username: getUsername,
            password: getHashPass,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};
