// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Divisi
const getAllDivisi = async () => {
    return await baseQuery('SELECT id, nama FROM tblDivisi WHERE status = 1', []);
};

// Define Query Get All Admin Divisi
const getAllAdminDivisi = async (params) => {
    const { pagination, sort } = params;

    const getQuery = `
        SELECT id, nama, DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i:%s") as createdAt,
        CASE 
            WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblDivisi
        ORDER BY id ${sort}
        ${pagination}
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get Divisi
const getDivisi = async (id) => {
    const [result] = await baseQuery('SELECT nama, status FROM tblDivisi WHERE id = ?', [id]);
    return result;
};

// Define Query Get Count Divisi
const getCountDivisi = async () => {
    const [result] = await baseQuery('SELECT COUNT(1) count FROM tblDivisi');
    return +result.count;
};

// Define Query Create Divisi
const createDivisi = async (params) => {
    const getQuery = `
        INSERT INTO tblDivisi
            (nama)
        VALUES
            (?)
    `;
    return await baseQuery(getQuery, [params.nama]);
};

// Define Query Update Divisi
const updateDivisi = async (params) => {
    return await baseQuery('UPDATE tblDivisi SET nama = ?, status = ? WHERE id = ?', [params.nama, params.status, params.id]);
};

// Define Query Delete Divisi
const deleteDivisi = async (id) => {
    return await baseQuery('DELETE FROM tblDivisi WHERE id = ?', [id]);
};

// Export All Divisi Models
module.exports.divisiModels = {
    getAllDivisi,
    getAllAdminDivisi,
    getDivisi,
    getCountDivisi,
    createDivisi,
    updateDivisi,
    deleteDivisi,
};
