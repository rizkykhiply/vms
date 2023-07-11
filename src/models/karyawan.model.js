// Import Config
const { validatePaginationFilter } = require('../config/helper.conf');

// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Karyawan
const getAllKaryawan = async (params) => {
    const { pagination, sort, startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT a.id, b.nama as divisi, a.nama, a.noInduk, a.noPolisi, a.noKartu, DATE_FORMAT(a.tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi, 
            CASE 
                WHEN a.status = 0 THEN 'Non Active' ELSE 'Active' 
            END as status
        FROM tblKaryawan as a, tblDivisi as b
        WHERE
            a.idDivisi = b.id ${getFilter}
        ORDER BY a.tglRegistrasi ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Karyawan
const getKaryawan = async (id) => {
    const getQuery = `
        SELECT id, idDivisi, nama, noInduk, noPolisi, noKartu, DATE_FORMAT(tglRegistrasi, "%Y-%m-%d %H:%i:%s") as tglRegistrasi, status 
        FROM tblKaryawan 
        WHERE 
            id = ?
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Count Karyawan
const getCountKaryawan = async (params) => {
    const { startDate, endDate } = params;

    const getFilter = validatePaginationFilter({
        startDate,
        endDate,
        column: 'DATE_FORMAT(tglRegistrasi, "%Y-%m-%d")',
    });

    const getQuery = `
        SELECT COUNT(1) count FROM tblKaryawan
        WHERE 
            1 = 1
            ${getFilter}
    `;
    const [result] = await baseQuery(getQuery, []);
    return +result.count;
};

// Define Query Create Karyawan
const createKaryawan = async (params) => {
    const getQuery = `
        INSERT INTO tblKaryawan
            (idDivisi, nama, noInduk, noPolisi, noKartu, image, tglRegistrasi)
        VALUES
            (?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [params.idDivisi, params.nama, params.noInduk, params.noPolisi, params.noKartu, params.image, params.tglRegistrasi]);
};

// Define Query Update Karyawan
const updateKaryawan = async (params) => {
    return await baseQuery(
        'UPDATE tblKaryawan SET idDivisi = ?, nama = ?, noInduk = ?, noPolisi = ?, noKartu = ?, tglRegistrasi = ?, status = ? WHERE id = ?',
        [params.idDivisi, params.nama, params.noInduk, params.noPolisi, params.noKartu, params.tglRegistrasi, params.status, params.id],
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
    getCountKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan,
};
