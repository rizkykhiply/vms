// Import Config
const { validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Report Transaksi Day Controller
module.exports.reportTransaksiDayController = async (req, res, next) => {
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

// Define Report Transaksi Karyawan Controller
module.exports.reportTransaksiKaryawanController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.reportModels.getCountReportTrxKaryawan(getPagination);
        const getTrxKaryawan = await models.reportModels.getReportTrxKaryawan(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
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
        const getCount = await models.reportModels.getCountReportTrxVisitor(getPagination);
        const getTrxVisitor = await models.reportModels.getReportTrxVisitor(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getTrxVisitor,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Count Barang Controller
module.exports.reportTransaksiCountBarangController = async (req, res, next) => {
    try {
        const getBarang = await models.reportModels.getCountReportTrxBarang(req.query);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};
