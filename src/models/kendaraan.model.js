// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Kendaraan
const getAllKendaraan = async () => {
    return await baseQuery('SELECT id, nama FROM tblKendaraan WHERE status = 1', []);
};

// Define Query Get All Admin Kendaraan
const getAllAdminKendaraan = async (params) => {
    const { pagination, sort } = params;

    const getQuery = `
        SELECT id, nama, DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i:%s") as createdAt,
        CASE 
            WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblKendaraan 
        ORDER BY id ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Kendaraan
const getKendaraan = async (id) => {
    const [result] = await baseQuery('SELECT nama, status FROM tblKendaraan WHERE id = ?', [id]);
    return result;
};

// Define Query Get Count Kendaraan
const getCountKendaraan = async () => {
    const [result] = await baseQuery('SELECT COUNT(1) count FROM tblKendaraan');
    return +result.count;
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
    getAllAdminKendaraan,
    getKendaraan,
    getCountKendaraan,
    createKendaraan,
    updateKendaraan,
    deleteKendaraan,
};
