// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get Report Trx Karyawan
const getReportTrxKaryawan = async (params) => {
    const { pagination, orderBy, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT a.id, b.nama, a.imgIn, a.imgOut, DATE_FORMAT(a.dateIn, "%d-%m-%Y %H:%i:%s") as dateIn, DATE_FORMAT(a.dateOut, "%d-%m-%Y %H:%i:%s") as dateOut, 
        a.kodePosIn, a.kodePosOut
        FROM tblTransaksi a
        JOIN tblKaryawan b ON a.idKaryawan = b.id
        WHERE
            (
                b.nama LIKE "%${search}%" OR b.noInduk LIKE "%${search}%" OR b.noPolisi LIKE "%${search}%" OR b.noKartu LIKE "%${search}%" OR 
                a.nota LIKE "%${search}%" OR a.lprNopol LIKE "%${search}%" OR a.kodePosIn LIKE "%${search}%" OR a.kodePosOut LIKE "%${search}%"
            )
            ${getFilter}
        ORDER BY ${orderBy} ${sort}
        ${pagination}
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get Report Trx Detail Karyawan
const getReportTrxDetKaryawan = async (id) => {
    const getQuery = ` 
        SELECT b.nama, b.noInduk, b.noPolisi, b.noKartu, a.nota, a.imgIn, a.imgOut, a.lprNopol
        FROM tblTransaksi a
        JOIN tblKaryawan b ON a.idKaryawan = b.id
        WHERE a.id = ?
    `;

    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Report Trx Visitor
const getReportTrxVisitor = async (params) => {
    const { pagination, orderBy, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.namaLengkap as nama, b.noPolisi, b.namaInstansi, a.lprNopol, a.imgIn, a.imgOut, DATE_FORMAT(a.dateIn, "%d-%m-%Y %H:%i:%s") as dateIn, 
        DATE_FORMAT(a.dateOut, "%d-%m-%Y %H:%i:%s") as dateOut, 
        a.kodePosIn, a.kodePosOut,
        CASE 
            WHEN b.status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblTransaksi a
        JOIN tblRegistrasi b ON a.idVisitor = b.id
        WHERE
            (
                b.namaLengkap LIKE "%${search}%" OR b.nik LIKE "%${search}%" OR b.namaInstansi LIKE "%${search}%" OR b.noPolisi LIKE "%${search}%" OR 
                a.nota LIKE "%${search}%" OR a.lprNopol LIKE "%${search}%" OR a.kodePosIn LIKE "%${search}%" OR a.kodePosOut LIKE "%${search}%"
            )
            ${getFilter}
        ORDER BY ${orderBy} ${sort}
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
            (b.nama LIKE "%${search}%" OR b.noPolisi LIKE "%${search}%" OR a.nota LIKE "%${search}%")
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
            (b.namaLengkap LIKE "%${search}%" OR b.noPolisi LIKE "%${search}%" OR b.namaInstansi LIKE "%${search}%")
            ${getFilter}
    `;

    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Get Count Report Trx Barang
const getCountReportTrxBarang = async (params) => {
    const { orderBy, sort, startDate, endDate } = params;

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
        ORDER BY ${orderBy} ${sort}
    `;

    return await baseQuery(getQuery);
};

// Define Query Get Count Trx In Out
const getCountReportTrxInOut = async () => {
    const getQuery = `
        SELECT 
        (
            SELECT COUNT(1) FROM tblTransaksi
            WHERE
                DATE_FORMAT(dateIn, '%Y-%m-%d') <= CURDATE() AND 
                isIn = 1
        ) totalTransaksiIn,
        (
            SELECT COUNT(1) FROM tblTransaksi
            WHERE
                DATE_FORMAT(dateOut , '%Y-%m-%d') <= CURDATE() AND 
                isOut = 1
        ) totalTransaksiOut
        FROM tblTransaksi  
        GROUP by 1
    `;
    const [result] = await baseQuery(getQuery, []);
    return result;
};

// Define Query Get Count Report Trx In Gate
const getCountReportTrxInGate = async () => {
    const getQuery = `
        SELECT a.nama, a.gate, a.type, IFNULL(b.total, 0) as total
        FROM tblPos a
        LEFT JOIN (
            SELECT kodePosIn, COUNT(*) as total 
            FROM tblTransaksi 
            WHERE 
                DATE_FORMAT(dateIn, '%Y-%m-%d') <= CURDATE() AND
                isIn = 1
            GROUP BY kodePosIn 
        ) as b ON a.nama = b.kodePosIn
        WHERE a.type = 1
        ORDER BY a.gate ASC
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Count Report Trx Out Gate
const getCountReportTrxOutGate = async () => {
    const getQuery = `
        SELECT a.nama, a.gate, a.type, IFNULL(b.total, 0) as total
        FROM tblPos a
        LEFT JOIN (
            SELECT kodePosOut, COUNT(*) as total 
            FROM tblTransaksi 
            WHERE 
                DATE_FORMAT(dateOut, '%Y-%m-%d') <= CURDATE() AND
                isOut = 1
            GROUP BY kodePosOut 
        ) as b ON a.nama = b.kodePosOut
        WHERE a.type = 2
        ORDER BY a.gate ASC
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Report Export Trx Karyawan
const getReportExportTrxKaryawan = async (params) => {
    const { sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT b.nama, a.nota, DATE_FORMAT(a.dateIn, "%d-%m-%Y %H:%i:%s") as dateIn, DATE_FORMAT(a.dateOut, "%d-%m-%Y %H:%i:%s") as dateOut, 
        a.kodePosIn, a.kodePosOut
        FROM tblTransaksi a
        JOIN tblKaryawan b ON a.idKaryawan = b.id
        WHERE
            1 = 1
            ${getFilter}
        ORDER BY a.id ${sort}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Report Export Trx Visitor
const getReportExportTrxVisitor = async (params) => {
    const { sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT b.namaLengkap as nama, b.noPolisi, b.namaInstansi, DATE_FORMAT(a.dateIn, "%d-%m-%Y %H:%i:%s") as dateIn,
        DATE_FORMAT(a.dateOut, "%d-%m-%Y %H:%i:%s") as dateOut, a.kodePosIn, a.kodePosOut,
        CASE 
            WHEN b.status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblTransaksi a
        JOIN tblRegistrasi b ON a.idVisitor = b.id
        WHERE
            1 = 1
            ${getFilter}
        ORDER BY a.id ${sort}
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get Report Export Trx Barang
const getReportExportTrxBarang = async (params) => {
    const { startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT b.nama AS barang, COUNT(1) AS total FROM tblRegistrasi a
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
    getReportTrxDetKaryawan,
    getReportTrxVisitor,
    getCountReportTrxKaryawan,
    getCountReportTrxVisitor,
    getCountReportTrxBarang,
    getCountReportTrxInOut,
    getCountReportTrxInGate,
    getCountReportTrxOutGate,
    getReportExportTrxKaryawan,
    getReportExportTrxVisitor,
    getReportExportTrxBarang,
};
