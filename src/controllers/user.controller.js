// Import Config
const { validateHashPassword, validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Get All User Controller
module.exports.getUsersController = async (req, res, next) => {
    try {
        const getCount = await models.userModels.getCountUser();
        const getPagination = validatePagination({ ...req.query, count: getCount });
        const getUsers = await models.userModels.getAllUsers(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getPagination.totalPage,
            data: getUsers,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get User Controller
module.exports.getUserController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getUser = await models.userModels.getUserById(getId);

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

// Define Create User Controller
module.exports.createUserController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getNama = getBody.nama;
        const getUsername = getBody.username;
        const getPassword = getBody.password;

        const getUser = await models.userModels.getUserByUsername(getUsername);

        if (getUser) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Username already exists',
            });
        }

        const getHashPass = await validateHashPassword(getPassword);

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

// Define Edit User Controller
module.exports.editUserController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getUsername = getBody.username;
        const getPassword = getBody.password;

        const getUser = await models.userModels.getUserById(getId);

        if (!getUser) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        if (getUser) {
            let getCurrUsername = getUser.username;
            if (getCurrUsername !== getUsername) {
                let getExists = await models.userModels.getUserByUsername(getUsername);
                if (getExists) {
                    return res.status(400).send({
                        statusCode: 400,
                        message: 'Username already exists',
                    });
                }
            }

            const getHashPass = getPassword ? await validateHashPassword(getPassword) : getPassword;
            await models.userModels.updateUser({
                id: getId,
                nama: getBody.nama,
                username: getUsername,
                password: getHashPass,
                status: getBody.status,
            });
        }

        return res.status(201).send({
            statusCode: 201,
            message: 'Updated',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete User Controller
module.exports.deleteUserController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getUser = await models.userModels.getUserById(getId);

        if (!getUser) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.userModels.deleteUser(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};
