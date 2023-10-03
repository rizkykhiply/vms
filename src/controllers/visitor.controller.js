// Import Config
const { validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Get All Visitor Controller
module.exports.getVisitorsController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.registrasiModels.getCountRegistrasiVisitor(getPagination);
        const getVisitor = await models.registrasiModels.getAllRegistrasiVisitor(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getVisitor,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get Visitor Controller
module.exports.getVisitorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getVisitor = await models.registrasiModels.getRegistrasiVisitor(getId);

        if (!getVisitor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getVisitor,
        });
    } catch (error) {
        next(error);
    }
};

// Define Edit Visitor Controller
module.exports.editVisitorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getUser = req.user;
        const getBody = req.body;

        const getVisitor = await models.registrasiModels.getRegistrasiVisitor(getId);

        if (!getVisitor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.registrasiModels.updateRegistrasi({
            id: getId,
            idUser: getUser.id,
            idKendaraan: getBody.idKendaraan,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            tujuan: getBody.tujuan,
            notes: getBody.notes,
            status: getBody.status,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di update',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Visitor Controller
module.exports.deleteVisitorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getVisitor = await models.registrasiModels.getRegistrasiVisitor(getId);

        if (!getVisitor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.registrasiModels.deleteRegistrasi(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
        });
    } catch (error) {
        next(error);
    }
};
