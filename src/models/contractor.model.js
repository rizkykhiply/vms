// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Contractor
const getAllContractor = async () => {
    return await baseQuery('SELECT id, nama FROM tblContractor WHERE status = 1', []);
};

// Define Query Get All Admin Contractor
const getAllAdminContractor = async (params) => {
    const { pagination, sort } = params;

    const getQuery = `
        SELECT id, nama,
        CASE 
            WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblContractor 
        ORDER BY createdAt ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Contractor
const getContractor = async (id) => {
    const [result] = await baseQuery('SELECT id, nama, status FROM tblContractor WHERE id = ?', [id]);
    return result;
};

// Define Query Get Count Contractor
const getCountContractor = async () => {
    const [result] = await baseQuery('SELECT COUNT(1) count FROM tblContractor');
    return +result.count;
};

// Define Query Create Contractor
const createContractor = async (params) => {
    const getQuery = `
        INSERT INTO tblContractor
            (nama)
        VALUES
            (?)
    `;
    return await baseQuery(getQuery, [params.nama]);
};

// Define Query Update Contractor
const updateContractor = async (params) => {
    return await baseQuery('UPDATE tblContractor SET nama = ?, status = ? WHERE id = ?', [params.nama, params.status, params.id]);
};

// Define Query Delete Contractor
const deleteContractor = async (id) => {
    return await baseQuery('DELETE FROM tblContractor WHERE id = ?', [id]);
};

// Export All Contractor Models
module.exports.contractorModels = {
    getAllContractor,
    getAllAdminContractor,
    getContractor,
    getCountContractor,
    createContractor,
    updateContractor,
    deleteContractor,
};
