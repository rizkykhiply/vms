// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Pos
const getAllPos = async () => {
    const getQuery = `
        SELECT id, nama, gate, liveCam,
        CASE
            WHEN type = 1 THEN "Pintu Masuk" ELSE "Pintu Keluar"
        END as type 
        FROM tblPos WHERE status = 1
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get All Admin Pos
const getAllAdminPos = async (params) => {
    const { pagination, orderBy, sort, search } = params;

    const getQuery = `
        SELECT id, nama, gate, liveCam,
        CASE
            WHEN type = 1 THEN "Pintu Masuk" ELSE "Pintu Keluar"
        END as type,
        DATE_FORMAT(createdAt, "%d-%m-%Y %H:%i:%s") as createdAt,
        CASE 
            WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
        END as status
        FROM tblPos
        WHERE
            nama LIKE "%${search}%"
        ORDER BY ${orderBy} ${sort}
        ${pagination}
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Pos
const getPos = async (id) => {
    const [result] = await baseQuery('SELECT nama, type, gate, liveCam, status FROM tblPos WHERE id = ?', [id]);
    return result;
};

// Define Query Get Count Pos
const getCountPos = async (params) => {
    const { search } = params;

    const [result] = await baseQuery(`SELECT COUNT(1) count FROM tblPos WHERE nama LIKE "%${search}%"`);
    return +result.count;
};

// Define Query Create Pos
const createPos = async (params) => {
    const getQuery = `
        INSERT INTO tblPos
            (nama, gate, type, liveCam)
        VALUES
            (?,?,?,?)
    `;
    return await baseQuery(getQuery, [params.nama, params.gate, params.type, params.liveCam]);
};

// Define Query Update Pos
const updatePos = async (params) => {
    return await baseQuery('UPDATE tblPos SET nama = ?, gate = ?, type = ?, liveCam = ?, status = ? WHERE id = ?', [
        params.nama,
        params.gate,
        params.type,
        params.liveCam,
        params.status,
        params.id,
    ]);
};

// Define Query Delete Pos
const deletePos = async (id) => {
    return await baseQuery('DELETE FROM tblPos WHERE id = ?', [id]);
};

// Export All Pos Models
module.exports.posModels = {
    getAllPos,
    getAllAdminPos,
    getPos,
    getCountPos,
    createPos,
    updatePos,
    deletePos,
};
