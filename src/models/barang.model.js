// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Barang
const getAllBarang = async () => {
    const getQuery = `
        SELECT a.id, CONCAT(a.nama, " ", CONCAT("(", b.nama, ")")) as barang
        FROM tblBarang as a, tblTypeBarang as b 
        WHERE 
            a.idTypeBarang = b.id AND 
            a.status = 1
        GROUP BY b.id
    `;
    return await baseQuery(getQuery, []);
};

const getBarang = async (id) => {
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

// Export All Barang Models
module.exports.barangModels = {
    getAllBarang,
    getBarang,
    createBarang,
};
