// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get User Login
const getUserLogin = async (username) => {
    const getQuery = `
        SELECT a.id, b.role, a.nama, a.password FROM tblUsers a, tblAccess b
        WHERE 
            a.idAccess = b.id AND
            a.username = ? AND a.status = 1
    `;
    const [result] = await baseQuery(getQuery, [username]);
    return result;
};

// Define Query Get User Logout
const getUserLogout = async (id) => {
    const [result] = await baseQuery('SELECT id FROM tblUsers WHERE id = ? AND status = 1', [id]);
    return result;
};

const getUserCheck = async (id) => {
    const getQuery = `
        SELECT a.id, b.role, a.nama FROM tblUsers a, tblAccess b
        WHERE 
            a.idAccess = b.id AND
            a.id = ? AND a.status = 1
    `;
    const [result] = await baseQuery(getQuery, [id]);
    return result;
};

// Define Query Get User By Username
const getUserByUsername = async (username) => {
    const [result] = await baseQuery('SELECT id FROM tblUsers WHERE username = ?', [username]);
    return result;
};

// Define Query Get User By Id
const getUserById = async (id) => {
    const [result] = await baseQuery('SELECT idAccess, nama, username, status FROM tblUsers WHERE id = ?', [id]);
    return result;
};

// Define Query Get All User
const getAllUsers = async (params) => {
    const { pagination, sort } = params;

    const getQuery = `
        SELECT a.id, a.nama, a.username, b.role, DATE_FORMAT(a.createdAt, "%Y-%m-%d %H:%i:%s") as createdAt,
            CASE 
                WHEN a.status = 0 THEN 'Non Active' ELSE 'Active' 
            END as status
        FROM tblUsers a, tblAccess b
        WHERE
            a.idAccess = b.id
        ORDER BY id ${sort}
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
            (idAccess, nama, username, password)
        VALUES
            (?,?,?,?)
    `;
    return await baseQuery(getQuery, [params.idAccess, params.nama, params.username, params.password]);
};

// Define Query Update User
const updateUser = async (params) => {
    let getQuery = '';
    let getParams = [];
    let getPass = params.password;

    if (getPass) {
        getQuery = 'UPDATE tblUsers SET idAccess = ?, nama = ?, username = ?, password = ?, status = ? WHERE id = ?';
        getParams.push(params.idAccess, params.nama, params.username, params.password, params.status, params.id);
    } else {
        getQuery = 'UPDATE tblUsers SET idAccess = ?, nama = ?, username = ?, status = ? WHERE id = ?';
        getParams.push(params.idAccess, params.nama, params.username, params.status, params.id);
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
