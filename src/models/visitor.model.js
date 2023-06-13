// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Create Visitor
const createVisitor = async (params) => {
    const getQuery = `
        INSERT INTO tblVisitorRegis 
            (idUser, idTypeKendaraan, idTujuan, waktu, namaLengkap, nik, namaInstansi, noPolisi, imageScan, imageCam, kodeQr)
        VALUES
            (?,?,?,?,?,?,?,?,?,?,?)
    `;
    return await baseQuery(getQuery, [
        params.idUser,
        params.idTypeKendaraan,
        params.idTujuan,
        params.waktu,
        params.namaLengkap,
        params.nik,
        params.namaInstansi,
        params.noPolisi,
        params.imageScan,
        params.imageCam,
        params.kodeQr,
    ]);
};

// Export All Auth Models
module.exports.visitorModels = { createVisitor };
