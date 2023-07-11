// Import Config
const { validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Get All Karyawan Controller
module.exports.getKaryawanController = async (req, res, next) => {
    try {
        const getCount = await models.karyawanModels.getCountKaryawan(req.query);
        const getPagination = validatePagination({ ...req.query, count: getCount });
        const getKaryawan = await models.karyawanModels.getAllKaryawan(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Succes',
            currentPage: getPagination.currentPage,
            totalPage: getPagination.totalPage,
            data: getKaryawan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get Detail Karyawan Controller
module.exports.getDetailKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getKaryawan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Edit Karyawan Controller
module.exports.editKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;

        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.karyawanModels.updateKaryawan({
            id: getId,
            idDivisi: getBody.idDivisi,
            nama: getBody.nama,
            noInduk: getBody.noInduk,
            noPolisi: getBody.noPolisi,
            noKartu: getBody.noKartu,
            tglRegistrasi: getBody.tglRegistrasi,
            status: getBody.status,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Updated',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Karyawan Controller
module.exports.deleteKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.karyawanModels.deleteKaryawan(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};
