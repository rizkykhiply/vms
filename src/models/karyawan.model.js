// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Create Karyawan
const createKaryawan = async (params) => {
    const getQuery = `
        INSERT INTO tblKaryawan
            (idDivisi, nama, noInduk, noPolisi, noKartu, tglRegistrasi)
        VALUES
            (?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [params.idDivisi, params.nama, params.noInduk, params.noPolisi, params.noKartu, params.tglRegistrasi]);
};

// Export All Karyawan Models
module.exports.karyawanModels = { createKaryawan };
