// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get Report Trx Karyawan
const getReportTrxKaryawan = async (params) => {
    const { pagination, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT a.id, b.nama, a.nota, a.imgIn, a.imgOut, DATE_FORMAT(a.dateIn, "%Y-%m-%d %H:%i:%s") as dateIn, DATE_FORMAT(a.dateOut, "%Y-%m-%d %H:%i:%s") as dateOut, 
        a.kodePosIn, a.kodePosOut
        FROM tblTransaksi a
        JOIN tblKaryawan b ON a.idKaryawan = b.id
        WHERE
            (b.nama LIKE "%${search}%" OR a.nota LIKE "%${search}%")
            ${getFilter}
        ORDER BY a.id ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Report Trx Visitor
const getReportTrxVisitor = async (params) => {
    const { pagination, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.namaLengkap as nama, a.nota, a.imgIn, a.imgOut, DATE_FORMAT(a.dateIn, "%Y-%m-%d %H:%i:%s") as dateIn, DATE_FORMAT(a.dateOut, "%Y-%m-%d %H:%i:%s") as dateOut, 
        a.kodePosIn, a.kodePosOut
        FROM tblTransaksi a
        JOIN tblRegistrasi b ON a.idVisitor = b.id
        WHERE
            b.status = 1 AND
            (b.namaLengkap LIKE "%${search}%" OR a.nota LIKE "%${search}%")
            ${getFilter}
        ORDER BY a.id ${sort}
        ${pagination}
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get Count Report Trx Karyawan
const getCountReportTrxKaryawan = async (params) => {
    const { search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblTransaksi a
        JOIN tblKaryawan b ON a.idKaryawan = b.id
        WHERE
            (b.nama LIKE "%${search}%" OR a.nota LIKE "%${search}%")
            ${getFilter}
    `;

    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Get Count Report Trx Visitor
const getCountReportTrxVisitor = async (params) => {
    const { search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblTransaksi a
        JOIN tblRegistrasi b ON a.idVisitor = b.id
        WHERE
            b.status = 1 AND
            (b.namaLengkap LIKE "%${search}%" OR a.nota LIKE "%${search}%")
            ${getFilter}
    `;

    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Get Count Report Trx Barang
const getCountReportTrxBarang = async (params) => {
    const { startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.nama AS barang, COUNT(1) AS total FROM tblRegistrasi a
        JOIN tblBarang b ON a.idBarang = b.id
        WHERE
            a.isRegis = 2 AND a.status = 1
            ${getFilter}
        GROUP BY b.id
    `;

    return await baseQuery(getQuery);
};

module.exports.reportModels = {
    getReportTrxKaryawan,
    getReportTrxVisitor,
    getCountReportTrxKaryawan,
    getCountReportTrxVisitor,
    getCountReportTrxBarang,
};
