// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Divisi
const getAllDivisi = async () => {
    return await baseQuery('SELECT id, nama FROM tblDivisi WHERE status = 1', []);
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

// Export All Divisi Models
module.exports.divisiModels = {
    getAllDivisi,
    createDivisi,
};
