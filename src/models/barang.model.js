// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Barang
const getAllBarang = async () => {
    const getQuery = `
        SELECT a.id, b.nama as typeBarang, a.nama as barang
        FROM tblBarang as a 
        JOIN tblTypeBarang as b ON a.idTypeBarang = b.id
        WHERE 
            a.status = 1
        ORDER BY b.id ASC
    `;
    return await baseQuery(getQuery, []);
};

// Define Query Get Barang
const getBarang = async (id) => {
    const getQuery = `
        SELECT id, idTypeBarang, nama, status
        FROM tblBarang
        WHERE 
            id = ? 
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get Antrian Barang
const getAntrianBarang = async (id) => {
    const getQuery = `
        SELECT a.nama as barang, b.nama as typeBarang
        FROM tblBarang as a, tblTypeBarang as b 
        WHERE 
            a.idTypeBarang = b.id AND 
            a.id = ? AND
            a.status = 1
        GROUP BY b.id
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Create Barang
const createBarang = async (params) => {
    const getQuery = `
        INSERT INTO tblBarang
            (idTypeBarang, nama)
        VALUES
            (?,?)
    `;
    return await baseQuery(getQuery, [params.idTypeBarang, params.nama]);
};

// Define Query Update Barang
const updateBarang = async (params) => {
    return await baseQuery('UPDATE tblBarang SET idTypeBarang = ?, nama = ?, status = ? WHERE id = ?', [
        params.idTypeBarang,
        params.nama,
        params.status,
        params.id,
    ]);
};

// Define Query Delete Barang
const deleteBarang = async (id) => {
    return await baseQuery('DELETE FROM tblBarang WHERE id = ?', [id]);
};

// Export All Barang Models
module.exports.barangModels = {
    getAllBarang,
    getBarang,
    getAntrianBarang,
    createBarang,
    updateBarang,
    deleteBarang,
};
