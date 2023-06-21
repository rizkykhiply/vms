// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get User
const getUser = async (username) => {
    const [result] = await baseQuery('SELECT id, nama, password FROM tblUsers WHERE username = ? AND status = 1', [username]);
    return result;
};

// Define Query Create User
const createUser = async (params) => {
    const getQuery = `
        INSERT INTO tblUsers
            (nama, username, password)
        VALUES
            (?,?,?)
    `;
    return await baseQuery(getQuery, [params.nama, params.username, params.password]);
};

// Export All Auth Models
module.exports.userModels = { getUser, createUser };
