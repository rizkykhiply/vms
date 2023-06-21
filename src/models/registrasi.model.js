// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Create Registrasi
const createRegistrasi = async (params) => {
    const getQuery = `
        INSERT INTO tblRegistrasi
            (idUser, idKendaraan, idBarang, namaLengkap, nik, namaInstansi, noPolisi, tujuan, imageScan, imageCam, kodeQr, tglRegistrasi, isRegis)
        VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idKendaraan,
        params.idBarang,
        params.namaLengkap,
        params.nik,
        params.namaInstansi,
        params.noPolisi,
        params.tujuan,
        params.imageScan,
        params.imageCam,
        params.kodeQr,
        params.tglRegistrasi,
        params.isRegis,
    ]);
};

// Export All Registrasi Models
module.exports.registrasiModels = { createRegistrasi };
