// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Type Barang
const getAllTypeBarang = async () => {
    return await baseQuery('SELECT id, nama FROM tblTypeBarang WHERE status = 1', []);
};

// Define Query Create Type Barang
const createTypeBarang = async (params) => {
    const getQuery = `
        INSERT INTO tblTypeBarang
            (nama)
        VALUES
            (?)
    `;
    return await baseQuery(getQuery, [params.nama]);
};

// Export All Type Barang Models
module.exports.typeBarangModels = {
    getAllTypeBarang,
    createTypeBarang,
};
