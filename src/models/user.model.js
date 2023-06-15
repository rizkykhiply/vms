// Import Base Query
const { baseQuery } = require('../configs/db.conf');

// Define Query Get User
const getUser = async (username) => {
    const [result] = await baseQuery('SELECT id, nama, password FROM tblUsers WHERE username = ? AND status = 1', [username]);
    return result;
};

// Export All Auth Models
module.exports.userModels = { getUser };
