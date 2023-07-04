// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Kendaraan
const getAllKendaraan = async () => {
    return await baseQuery('SELECT id, nama FROM tblKendaraan WHERE status = 1', []);
};

// Define Query Get Kendaraan
const getKendaraan = async (id) => {
    const [result] = await baseQuery('SELECT id, nama, status FROM tblKendaraan WHERE id = ?', [id]);
    return result;
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

// Define Query Update Kendaraan
const updateKendaraan = async (params) => {
    return await baseQuery('UPDATE tblKendaraan SET nama = ?, status = ? WHERE id = ?', [params.nama, params.status, params.id]);
};

// Define Query Delete Kendaraan
const deleteKendaraan = async (id) => {
    return await baseQuery('DELETE FROM tblKendaraan WHERE id = ?', [id]);
};

// Export All Kendaraan Models
module.exports.kendaraanModels = {
    getAllKendaraan,
    getKendaraan,
    createKendaraan,
    updateKendaraan,
    deleteKendaraan,
};
