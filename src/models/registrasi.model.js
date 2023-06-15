// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Create Registrasi
const createRegistrasi = async (params) => {
    const getQuery = `
        INSERT INTO tblRegistrasi
            (idUser, idKendaraan, idBarang, waktu, namaLengkap, nik, namaInstansi, noPolisi, tujuan, imageScan, imageCam, kodeQr, isRegis)
        VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idKendaraan,
        params.idBarang,
        params.waktu,
        params.namaLengkap,
        params.nik,
        params.namaInstansi,
        params.noPolisi,
        params.tujuan,
        params.imageScan,
        params.imageCam,
        params.kodeQr,
        params.isRegis,
    ]);
};

// Export All Registrasi Models
module.exports.registrasiModels = { createRegistrasi };
