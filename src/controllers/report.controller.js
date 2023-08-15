// Import Models
const { validatePagination } = require('../config/helper.conf');
const { models } = require('../models');

// Define Report Count Day Controller
module.exports.reportCountDayController = async (req, res, next) => {
    try {
        const [registrasi, karyawan, transaksi] = await Promise.all([
            models.registrasiModels.getCountRegistrasiPerDay(),
            models.karyawanModels.getCountKaryawanPerDay(),
            models.transaksiModels.getCountTransaksiPerDay(),
        ]);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: {
                ...registrasi,
                ...karyawan,
                ...transaksi,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Count Barang Day Controller
module.exports.reportCountBarangDayController = async (req, res, next) => {
    try {
        const getBarang = await models.registrasiModels.getCountRegistrasiBarangPerDay(req.query);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Visitor Controller
module.exports.reportVisitorController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getVisitor = await models.reportModels.getReportVisitor(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getVisitor,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Karyawan Controller
module.exports.reportTransaksiKaryawanController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getTrxKaryawan = await models.reportModels.getReportTrxKaryawan(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getTrxKaryawan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Visitor Controller
module.exports.reportTransaksiVisitorController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getTrxVisitor = await models.reportModels.getReportTrxVisitor(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getTrxVisitor,
        });
    } catch (error) {
        next(error);
    }
};
