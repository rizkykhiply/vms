// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get User Login
const getUserLogin = async (username) => {
    const [result] = await baseQuery('SELECT id, nama, password FROM tblUsers WHERE username = ? AND status = 1', [username]);
    return result;
};

// Define Query Get User Logout
const getUserLogout = async (id) => {
    const [result] = await baseQuery('SELECT id FROM tblUsers WHERE id = ? AND status = 1', [id]);
    return result;
};

const getUserCheck = async (id) => {
    const [result] = await baseQuery('SELECT id, nama, username, status FROM tblUsers WHERE id = ? AND status = 1', [id]);
    return result;
};

// Define Query Get User By Username
const getUserByUsername = async (username) => {
    const [result] = await baseQuery('SELECT id FROM tblUsers WHERE username = ?', [username]);
    return result;
};

// Define Query Get User By Id
const getUserById = async (id) => {
    const [result] = await baseQuery('SELECT id, nama, username, status FROM tblUsers WHERE id = ?', [id]);
    return result;
};

// Define Query Get All User
const getAllUsers = async (params) => {
    const { pagination, sort } = params;

    const getQuery = `
        SELECT id, nama, username,
            CASE 
                WHEN status = 0 THEN 'Non Active' ELSE 'Active' 
            END as status
        FROM tblUsers
        ORDER BY createdAt ${sort}
        ${pagination}
    `;

    return await baseQuery(getQuery, []);
};

// Define Query Get Count User
const getCountUser = async () => {
    const [result] = await baseQuery('SELECT COUNT(1) count FROM tblUsers');
    return +result.count;
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

// Define Query Update User
const updateUser = async (params) => {
    let getQuery = '';
    let getParams = [];
    let getPass = params.password;

    if (getPass) {
        getQuery = 'UPDATE tblUsers SET nama = ?, password = ?, status = ? WHERE id = ?';
        getParams.push(params.nama, params.password, params.status, params.id);
    } else {
        getQuery = 'UPDATE tblUsers SET nama = ?, status = ? WHERE id = ?';
        getParams.push(params.nama, params.status, params.id);
    }

    return await baseQuery(getQuery, getParams);
};

// Define Query Delete User
const deleteUser = async (id) => {
    return await baseQuery('DELETE FROM tblUsers WHERE id = ?', [id]);
};

// Export All Auth Models
module.exports.userModels = {
    getUserLogin,
    getUserLogout,
    getUserCheck,
    getUserByUsername,
    getUserById,
    getAllUsers,
    getCountUser,
    createUser,
    updateUser,
    deleteUser,
};
