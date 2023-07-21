// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get Count Transaksi Per Day
const getCountTransaksiPerDay = async () => {
    const getQuery = `
        SELECT 
        (
            SELECT COUNT(1) FROM tblTransaksi
            WHERE
                DATE_FORMAT(dateIn, '%Y-%m-%d') = CURDATE() AND 
                isIn = 1 AND isOut = 0
        ) totalTransaksiIn,
        (
            SELECT COUNT(1) FROM tblTransaksi
            WHERE
                DATE_FORMAT(dateOut , '%Y-%m-%d') = CURDATE() AND 
                isIn = 1 AND isOut = 1
        ) totalTransaksiOut
        FROM tblTransaksi  
        GROUP by 1
    `;
    const [result] = await baseQuery(getQuery, []);
    return result;
};

// Export All Transaksi Models
module.exports.transaksiModels = {
    getCountTransaksiPerDay,
};
