// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Get All Kendaraan
const getAllKendaraan = async () => {
    return await baseQuery('SELECT id, nama FROM tblKendaraan WHERE status = 1', []);
};

// Export All Kendaraan Models
module.exports.kendaraanModels = { getAllKendaraan };
