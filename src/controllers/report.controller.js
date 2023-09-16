// Import Modules
const PDFDocument = require('pdfkit-table');

// Import Config
const { validatePagination, validateTime } = require('../config/helper.conf');

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
        const getPagination = validatePagination({ ...req.query });
        const getBarang = await models.reportModels.getCountReportTrxBarang(getPagination);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Karyawan Export Controller
module.exports.reportTransaksiKaryawanExportController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxKaryawan(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();
        const doc = new PDFDocument({ margin: 30 });

        const table = {
            title: {
                label: `Transaksi Karyawan ${Array(80).fill('\xa0').join('')} ${validateTime({ request: new Date(), type: 'date-time-4' })}`,
                fontSize: 12,
            },
            headers: [
                { label: 'Nama Karyawan', width: 100, headerOpacity: 0.3 },
                { label: 'No Nota', width: 115, headerOpacity: 0.3 },
                { label: 'Waktu Masuk', width: 100, headerOpacity: 0.3 },
                { label: 'Waktu Keluar', width: 100, headerOpacity: 0.3 },
                { label: 'Pos Masuk', width: 70, headerOpacity: 0.3 },
                { label: 'Pos Keluar', width: 70, headerOpacity: 0.3 },
            ],
            rows: getExportData,
        };
        await doc.table(table, {
            padding: 10,
            columnSpacing: 10,
        });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=report_karyawan_${getCurrentTime}.pdf`,
        });
        doc.pipe(res);
        doc.end();
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Visitor Export Controller
module.exports.reportTransaksiVisitorExportController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxVisitor(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();
        const doc = new PDFDocument({ margin: 30 });

        const table = {
            title: {
                label: `Transaksi Visitor ${Array(86).fill('\xa0').join('')} ${validateTime({ request: new Date(), type: 'date-time-4' })}`,
                fontSize: 12,
            },
            headers: [
                { label: 'Nama Visitor', width: 100, headerOpacity: 0.3 },
                { label: 'No Nota', width: 115, headerOpacity: 0.3 },
                { label: 'Waktu Masuk', width: 100, headerOpacity: 0.3 },
                { label: 'Waktu Keluar', width: 100, headerOpacity: 0.3 },
                { label: 'Pos Masuk', width: 70, headerOpacity: 0.3 },
                { label: 'Pos Keluar', width: 70, headerOpacity: 0.3 },
            ],
            rows: getExportData,
        };
        await doc.table(table, {
            padding: 10,
            columnSpacing: 10,
        });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=report_visitor_${getCurrentTime}.pdf`,
        });
        doc.pipe(res);
        doc.end();
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Barang Export Controller
module.exports.reportTransaksiBarangExportController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxBarang(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();
        const doc = new PDFDocument({ margin: 30 });

        const table = {
            title: {
                label: `Transaksi Material ${Array(84).fill('\xa0').join('')} ${validateTime({ request: new Date(), type: 'date-time-4' })}`,
                fontSize: 12,
            },
            headers: [
                { label: 'Nama Material', width: 280, headerOpacity: 0.3 },
                { label: 'Total Material', width: 275, align: 'center', headerOpacity: 0.3 },
            ],
            rows: getExportData,
        };
        await doc.table(table, {
            padding: 10,
            columnSpacing: 10,
        });
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=report_material_${getCurrentTime}.pdf`,
        });
        doc.pipe(res);
        doc.end();
    } catch (error) {
        next(error);
    }
};
