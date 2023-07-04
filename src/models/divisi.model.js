// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Divisi
const getAllDivisi = async () => {
    return await baseQuery('SELECT id, nama FROM tblDivisi WHERE status = 1', []);
};

// Define Query Get Divisi
const getDivisi = async (id) => {
    const [result] = await baseQuery('SELECT id, nama, status FROM tblDivisi WHERE id = ?', [id]);
    return result;
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
    getDivisi,
    createDivisi,
    updateDivisi,
    deleteDivisi,
};
