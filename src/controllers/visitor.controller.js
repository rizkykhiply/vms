// Import Models
const { models } = require('../models');

// Define Get All Visitor Controller
module.exports.getVisitorsController = async (req, res, next) => {
    try {
        const getVisitor = await models.registrasiModels.getAllRegistrasiVisitor();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
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
                message: 'Not Found',
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
                message: 'Not Found',
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

// Define Delete Visitor Controller
module.exports.deleteVisitorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getVisitor = await models.registrasiModels.getRegistrasiVisitor(getId);

        if (!getVisitor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.registrasiModels.deleteRegistrasi(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};
