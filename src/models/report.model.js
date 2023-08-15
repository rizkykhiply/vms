// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get Report Visitor
const getReportVisitor = async (params) => {
    const { sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT a.id, b.nama as petugas, c.nama as kendaraan, d.nama as barang, e.nama as kios, a.namaLengkap, a.nik, a.namaInstansi, a.noPolisi, a.imageScan,
        a.imageCam, a.kodeQr, a.noAntrian, DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi,
            CASE
                WHEN a.status = 0 THEN "Non Active" ELSE "Active"
            END as status
        FROM tblRegistrasi as a, tblUsers as b, tblKendaraan as c, tblBarang as d, tblKios as e
        WHERE 
            a.idUser = b.id AND
            a.idKendaraan = c.id AND
            a.idBarang = d.id AND
            a.idKios = 1 AND
            a.isRegis = 2 AND 
            a.status = 1  
            ${getFilter}
        ORDER BY a.tglRegistrasi ${sort}
`;
    return await baseQuery(getQuery, []);
};

// Define Query Get Report Trx Karyawan
const getReportTrxKaryawan = async (params) => {
    const { sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT a.nota as nota, DATE_FORMAT(a.dateIn, "%Y-%m-%d %H:%i:%s") as waktuMasuk, DATE_FORMAT(a.dateOut, "%Y-%m-%d %H:%i:%s") as waktuKeluar, a.lprNopol as nopol, a.kodePos as pos, a.imgIn as imgIn, a.imgOut as imgOut, b.nama as nama
        FROM tblTransaksi a
        INNER JOIN tblKaryawan b ON a.idKaryawan = b.id 
        WHERE 
            1 = 1
            ${getFilter}
        ORDER BY a.dateIn ${sort}
`;
    return await baseQuery(getQuery, []);
};

// Define Query Get Report Trx Visitor
const getReportTrxVisitor = async (params) => {
    const { sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.dateIn, "%Y-%m-%d")',
    });

    const getQuery = ` 
        SELECT a.nota as nota,  DATE_FORMAT(a.dateIn, "%Y-%m-%d %H:%i:%s") as waktuMasuk, DATE_FORMAT(a.dateOut, "%Y-%m-%d %H:%i:%s") as waktuKeluar, a.lprNopol as nopol, a.kodePos as pos, a.imgIn as imgIn, a.imgOut as imgOut, b.namaLengkap as nama
        FROM tblTransaksi a
        INNER JOIN tblRegistrasi b ON a.idVisitor = b.id
        INNER JOIN tblKendaraan c ON b.idKendaraan = c.id 
        WHERE 
            1 = 1
            ${getFilter}
        ORDER BY a.dateIn ${sort}
`;
    return await baseQuery(getQuery, []);
};

module.exports.reportModels = {
    getReportVisitor,
    getReportTrxKaryawan,
    getReportTrxVisitor,
};
