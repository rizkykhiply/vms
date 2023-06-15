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
