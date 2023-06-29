// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Kendaraan
const getAllKendaraan = async () => {
    return await baseQuery('SELECT id, nama FROM tblKendaraan WHERE status = 1', []);
};

// Define Query Create Kendaraan
const createKendaraan = async (params) => {
    const getQuery = `
        INSERT INTO tblKendaraan
            (nama)
        VALUES
            (?)
    `;
    return await baseQuery(getQuery, [params.nama]);
};

// Export All Kendaraan Models
module.exports.kendaraanModels = {
    getAllKendaraan,
    createKendaraan,
};
