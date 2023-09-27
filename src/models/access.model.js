// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Get All Access
const getAllAccess = async () => {
    return await baseQuery('SELECT id, role FROM tblAccess WHERE status = 1', []);
};

// Export All Access Models
module.exports.accessModels = {
    getAllAccess,
};
