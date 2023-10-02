// Import Modules
const PDFDocument = require('pdfkit-table');
const csv = require('fast-csv');
const xlsx = require('xlsx');
const stream = require('stream');

// Import Config
const { validatePagination, validateTime } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Report Transaksi Day Controller
module.exports.reportTransaksiDayController = async (req, res, next) => {
    try {
        const [registrasi, karyawan, transaksi] = await Promise.all([
            models.registrasiModels.getCountRegistrasiPerDay(),
            models.karyawanModels.getCountTrxKaryawanPerDay(),
            models.reportModels.getCountReportTrxInOut(),
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

// Define Report Transaksi Detail Karyawan Controller
module.exports.reportTransaksiDetailKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getTrxDetailKaryawan = await models.reportModels.getReportTrxDetKaryawan(getId);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getTrxDetailKaryawan,
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

// Define Report Transaksi Gate Controller
module.exports.reportTransaksiGateController = async (req, res, next) => {
    try {
        const [trxIn, trxOut] = await Promise.all([models.reportModels.getCountReportTrxInGate(), models.reportModels.getCountReportTrxOutGate()]);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: {
                gateA: {
                    gateIn: trxIn.filter((value) => value.gate === 'A' && value.type === 1),
                    gateOut: trxOut.filter((value) => value.gate === 'A' && value.type === 2),
                },
                gateB: {
                    gateIn: trxIn.filter((value) => value.gate === 'B' && value.type === 1),
                    gateOut: trxOut.filter((value) => value.gate === 'B' && value.type === 2),
                },
                gateC: {
                    gateIn: trxIn.filter((value) => value.gate === 'C' && value.type === 1),
                    gateOut: trxOut.filter((value) => value.gate === 'C' && value.type === 2),
                },
            },
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
        const getType = req.query?.type;
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxKaryawan(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();

        switch (getType) {
            case 'pdf':
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
                break;

            case 'csv':
                const getDataCsv = [['Nama Karyawan', 'No Nota', 'Waktu Masuk', 'Waktu Keluar', 'Pos Masuk', 'Pos Keluar'], ...getExportData];

                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=report_karyawan_${getCurrentTime}.csv`);

                csv.writeToStream(res, getDataCsv, { headers: true });
                break;

            case 'xlsx':
                const getDataExcel = [['Nama Karyawan', 'No Nota', 'Waktu Masuk', 'Waktu Keluar', 'Pos Masuk', 'Pos Keluar'], ...getExportData];
                const getWorkBook = xlsx.utils.book_new();
                const getWorkSheet = xlsx.utils.aoa_to_sheet(getDataExcel);

                xlsx.utils.book_append_sheet(getWorkBook, getWorkSheet);

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=report_karyawan_${getCurrentTime}.xlsx`);

                const getBuffer = xlsx.write(getWorkBook, { bookType: 'xlsx', type: 'buffer' });
                const getStream = new stream.Readable();
                getStream.push(getBuffer);
                getStream.push(null);
                getStream.pipe(res);
                break;
        }
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Visitor Export Controller
module.exports.reportTransaksiVisitorExportController = async (req, res, next) => {
    try {
        const getType = req.query?.type;
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxVisitor(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();

        switch (getType) {
            case 'pdf':
                const doc = new PDFDocument({ margin: 30 });

                const table = {
                    title: {
                        label: `Transaksi Visitor ${Array(86).fill('\xa0').join('')} ${validateTime({ request: new Date(), type: 'date-time-4' })}`,
                        fontSize: 12,
                    },
                    headers: [
                        { label: 'Nama Visitor', width: 100, headerOpacity: 0.3 },
                        { label: 'No Polisi', width: 70, headerOpacity: 0.3 },
                        { label: 'Nama Instansi', width: 100, headerOpacity: 0.3 },
                        { label: 'Waktu Masuk', width: 70, headerOpacity: 0.3 },
                        { label: 'Waktu Keluar', width: 70, headerOpacity: 0.3 },
                        { label: 'Pos Masuk', width: 50, headerOpacity: 0.3 },
                        { label: 'Pos Keluar', width: 50, headerOpacity: 0.3 },
                        { label: 'Status', width: 45, headerOpacity: 0.3 },
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
                break;

            case 'csv':
                const getDataCsv = [
                    ['Nama Visitor', 'No Polisi', 'Nama Instansi', 'Waktu Masuk', 'Waktu Keluar', 'Pos Masuk', 'Pos Keluar', 'Status'],
                    ...getExportData,
                ];

                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=report_visitor_${getCurrentTime}.csv`);

                csv.writeToStream(res, getDataCsv, { headers: true });
                break;

            case 'xlsx':
                const getDataExcel = [
                    ['Nama Visitor', 'No Polisi', 'Nama Instansi', 'Waktu Masuk', 'Waktu Keluar', 'Pos Masuk', 'Pos Keluar', 'Status'],
                    ...getExportData,
                ];
                const getWorkBook = xlsx.utils.book_new();
                const getWorkSheet = xlsx.utils.aoa_to_sheet(getDataExcel);

                xlsx.utils.book_append_sheet(getWorkBook, getWorkSheet);

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=report_visitor_${getCurrentTime}.xlsx`);

                const getBuffer = xlsx.write(getWorkBook, { bookType: 'xlsx', type: 'buffer' });
                const getStream = new stream.Readable();
                getStream.push(getBuffer);
                getStream.push(null);
                getStream.pipe(res);
                break;
        }
    } catch (error) {
        next(error);
    }
};

// Define Report Transaksi Barang Export Controller
module.exports.reportTransaksiBarangExportController = async (req, res, next) => {
    try {
        const getType = req.query?.type;
        const getPagination = validatePagination({ ...req.query });
        const getExportTrx = await models.reportModels.getReportExportTrxBarang(getPagination);

        const getExportData = [];

        for (let index = 0; index < getExportTrx.length; index++) {
            const getData = Object.values(getExportTrx[index]).map((value) => (value ? value : ''));
            getExportData.push(getData);
        }

        const getCurrentTime = new Date().getTime();

        switch (getType) {
            case 'pdf':
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
                break;

            case 'csv':
                const getDataCsv = [['Nama Material', 'Total Material'], ...getExportData];

                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=report_material_${getCurrentTime}.csv`);

                csv.writeToStream(res, getDataCsv, { headers: true });
                break;

            case 'xlsx':
                const getDataExcel = [['Nama Material', 'Total Material'], ...getExportData];
                const getWorkBook = xlsx.utils.book_new();
                const getWorkSheet = xlsx.utils.aoa_to_sheet(getDataExcel);

                xlsx.utils.book_append_sheet(getWorkBook, getWorkSheet);

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=report_material_${getCurrentTime}.xlsx`);

                const getBuffer = xlsx.write(getWorkBook, { bookType: 'xlsx', type: 'buffer' });
                const getStream = new stream.Readable();
                getStream.push(getBuffer);
                getStream.push(null);
                getStream.pipe(res);
                break;
        }
    } catch (error) {
        next(error);
    }
};
