// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Get User
const getUser = async (username) => {
    const [result] = await baseQuery('SELECT idUser, nama, password FROM tblUsers WHERE username = ?', [username]);
    return result;
};

// Export All Auth Models
module.exports.authModels = { getUser };
