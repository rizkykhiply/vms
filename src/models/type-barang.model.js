// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Type Barang
const getAllTypeBarang = async () => {
    return await baseQuery('SELECT id, nama FROM tblTypeBarang WHERE status = 1', []);
};

// Define Query Get All Admin Type Barang
const getAllAdminTypeBarang = async (params) => {
    const { pagination, orderBy, sort, search } = params;

    const getQuery = `
        SELECT id, nama, DATE_FORMAT(createdAt, "%d-%m-%Y %H:%i:%s") as createdAt,
        CASE 
            WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblTypeBarang
        WHERE
            nama LIKE "%${search}%"
        ORDER BY ${orderBy} ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Type Barang
const getTypeBarang = async (id) => {
    const [result] = await baseQuery('SELECT nama, status FROM tblTypeBarang WHERE id = ?', [id]);
    return result;
};

// Define Query Get Count Type Barang
const getCountTypeBarang = async (params) => {
    const { search } = params;

    const [result] = await baseQuery(`SELECT COUNT(1) count FROM tblTypeBarang WHERE nama LIKE "%${search}%"`);
    return +result.count;
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

// Define Query Update Type Barang
const updateTypeBarang = async (params) => {
    return await baseQuery('UPDATE tblTypeBarang SET nama = ?, status = ? WHERE id = ?', [params.nama, params.status, params.id]);
};

// Define Query Delete Type Barang
const deleteTypeBarang = async (id) => {
    return await baseQuery('DELETE FROM tblTypeBarang WHERE id = ?', [id]);
};

// Export All Type Barang Models
module.exports.typeBarangModels = {
    getAllTypeBarang,
    getAllAdminTypeBarang,
    getTypeBarang,
    getCountTypeBarang,
    createTypeBarang,
    updateTypeBarang,
    deleteTypeBarang,
};
