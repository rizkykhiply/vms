// Import Base Query
const { baseQuery } = require('../config/db.conf');

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
module.exports.divisiModels = { createDivisi };
