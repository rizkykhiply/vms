// Import Models
const { models } = require('../models');

// Define Master Kendaraan Controller
module.exports.masterKendaraanController = async (req, res, next) => {
    try {
        const getKendaraan = await models.kendaraanModels.getAllKendaraan();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getKendaraan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Barang Controller
module.exports.masterBarangController = async (req, res, next) => {
    try {
        const getBarang = await models.barangModels.getAllBarang();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Divisi Controller
module.exports.masterDivisiController = async (req, res, next) => {
    try {
        const getDivisi = await models.divisiModels.getAllDivisi();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getDivisi,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Kendaraan Controller
module.exports.createMasterKendaraanController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.kendaraanModels.createKendaraan({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Barang Controller
module.exports.createMasterBarangController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.barangModels.createBarang({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Divisi Controller
module.exports.createMasterDivisiController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.divisiModels.createDivisi({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};
