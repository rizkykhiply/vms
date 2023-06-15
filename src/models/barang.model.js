// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Get All Barang
const getAllBarang = async () => {
    const getQuery = `
        SELECT b.id, CONCAT(b.nama, " ", CONCAT("(", tb.nama, ")")) as barang
        FROM tblBarang as b, tblTypeBarang as tb 
        WHERE 
            b.idTypeBarang = tb.id AND b.status = 1
        GROUP BY b.id
    `;
    return await baseQuery(getQuery, []);
};

// Export All Barang Models
module.exports.barangModels = { getAllBarang };
