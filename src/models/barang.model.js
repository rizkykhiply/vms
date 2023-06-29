// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Barang
const getAllBarang = async () => {
    const getQuery = `
        SELECT b.id, CONCAT(b.nama, " ", CONCAT("(", tb.nama, ")")) as barang
        FROM tblBarang as b, tblTypeBarang as tb 
        WHERE 
            b.idTypeBarang = tb.id AND 
            b.status = 1
        GROUP BY b.id
    `;
    return await baseQuery(getQuery, []);
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
    createBarang,
};
