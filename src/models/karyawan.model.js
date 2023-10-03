// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Karyawan
const getAllKaryawan = async (params) => {
    const { pagination, orderBy, sort, search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.nama as divisi, c.nama as contractor, a.nama, a.noInduk, a.noPolisi, a.noKartu, a.image, DATE_FORMAT(a.tglRegistrasi, "%d-%m-%Y %H:%i:%s") as tglRegistrasi, 
            CASE 
                WHEN a.status = 0 THEN 'Non Active' ELSE 'Active' 
            END as status
        FROM tblKaryawan as a
        JOIN tblDivisi as b ON a.idDivisi = b.id
        LEFT JOIN tblContractor as c ON a.idContractor = c.id 
        WHERE
            (a.nama LIKE "%${search}%" OR a.noKartu LIKE "%${search}%" OR a.noPolisi LIKE "%${search}%" OR a.noInduk LIKE "%${search}%")
            ${getFilter}
        ORDER BY ${orderBy} ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Karyawan
const getKaryawan = async (id) => {
    const getQuery = `
        SELECT idDivisi, idContractor, nama, noInduk, noPolisi, noKartu, image, DATE_FORMAT(tglRegistrasi, "%d-%m-%Y %H:%i:%s") as tglRegistrasi, status 
        FROM tblKaryawan 
        WHERE 
            id = ?
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get No Kartu Karyawan
const getNoKartuKaryawan = async (noKartu) => {
    const [result] = await baseQuery('SELECT id FROM tblKaryawan WHERE noKartu = ?', [noKartu]);
    return result;
};

// Define Query Get Count Karyawan
const getCountKaryawan = async (params) => {
    const { search, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblKaryawan
        WHERE 
            1 = 1 AND
           (nama LIKE "%${search}%" OR noKartu LIKE "%${search}%" OR noPolisi LIKE "%${search}%" OR noInduk LIKE "%${search}%")
            ${getFilter}
    `;
    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Get Count Trx Karyawan Per Day
const getCountTrxKaryawanPerDay = async () => {
    const getQuery = `
        SELECT COUNT(1) totalKaryawan FROM tblTransaksi a, tblKaryawan b
        WHERE
            a.idKaryawan = b.id AND
            DATE_FORMAT(a.dateIn, '%Y-%m-%d') <= CURDATE()
    `;
    const [result] = await baseQuery(getQuery, []);
    return result;
};

// Define Query Create Karyawan
const createKaryawan = async (params) => {
    const getQuery = `
        INSERT INTO tblKaryawan
            (idDivisi, idContractor, nama, noInduk, noPolisi, noKartu, image, tglRegistrasi)
        VALUES
            (?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idDivisi,
        params.idContractor,
        params.nama,
        params.noInduk,
        params.noPolisi,
        params.noKartu,
        params.image,
        params.tglRegistrasi,
    ]);
};

// Define Query Create Import Karyawan
const createImportKaryawan = async (params) => {
    const getQuery = `
        INSERT INTO tblKaryawan
            (idDivisi, idContractor, nama, noInduk, noPolisi, noKartu, image, tglRegistrasi)
        VALUES
            (?,?,?,?,?,?,"",NOW())
    `;
    return await baseQuery(getQuery, [params.idDivisi, params.idContractor, params.nama, params.noInduk, params.noPolisi, params.noKartu]);
};

// Define Query Update Karyawan
const updateKaryawan = async (params) => {
    return await baseQuery(
        'UPDATE tblKaryawan SET idDivisi = ?, idContractor = ?, nama = ?, noInduk = ?, noPolisi = ?, noKartu = ?, image = ?, status = ? WHERE id = ?',
        [params.idDivisi, params.idContractor, params.nama, params.noInduk, params.noPolisi, params.noKartu, params.image, params.status, params.id],
    );
};

// Define Query Delete Karyawan
const deleteKaryawan = async (id) => {
    return await baseQuery('DELETE FROM tblKaryawan WHERE id = ?', [id]);
};

// Export All Karyawan Models
module.exports.karyawanModels = {
    getAllKaryawan,
    getKaryawan,
    getNoKartuKaryawan,
    getCountKaryawan,
    getCountTrxKaryawanPerDay,
    createKaryawan,
    createImportKaryawan,
    updateKaryawan,
    deleteKaryawan,
};
