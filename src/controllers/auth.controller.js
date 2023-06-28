// Import Modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import config
const { JWT_SECRET_KEY } = require('../config/constant.conf');

// Import Models
const { models } = require('../models');

// Define Auth Login Controller
module.exports.authLoginController = async (req, res, next) => {
    try {
        const getUsername = req.body.username;
        const getPassword = req.body.password;

        const getUser = await models.userModels.getUserLogin(getUsername);

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
        );

        return res.status(201).send({
            statusCode: 201,
            message: 'Success',
            data: {
                id: getId,
                nama: getName,
                username: getUsername,
                access_token: getAccessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Define Auth Logout Controller
module.exports.authLogoutController = async (req, res, next) => {
    try {
        const getId = req.user.id;
        const getUser = await models.userModels.getUserLogout(getId);

        if (!getUser) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

// Define Auth Check Controller
module.exports.authCheckController = async (req, res, next) => {
    try {
        const getId = req.user.id;
        const getUser = await models.userModels.getUserCheck(getId);

        if (!getUser) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getUser,
        });
    } catch (error) {
        next(error);
    }
};
