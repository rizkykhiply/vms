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
module.exports.reportTransaksiVisController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getReportVis = await models.reportModels.getReportVis(getPagination);
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getReportVis,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Karyawan Controller
module.exports.reportTransaksiKaryawanController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getReportTrxKry = await models.reportModels.getReportTrxKaryawan(getPagination);
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getReportTrxKry,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Visitor Controller
module.exports.reportTrxVisitorController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getReportTrxKry = await models.reportModels.getReportTrxVis(getPagination);
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getReportTrxKry,
        });
    } catch (error) {
        next(error);
    }
};