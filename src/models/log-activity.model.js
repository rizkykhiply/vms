// Import Base Query
const { baseQuery } = require('../config/db.conf');

// Define Query Add Activity
const addActivity = async (params) => {
    const getQuery = `
        INSERT INTO logActivity (
            idKaryawan,
            activityIn,
            activityOut,
        ) VALUES (?, ?, ?)
    `;
    return await baseQuery(getQuery, [params.idKaryawan, params.activityIn, params.activityOut]);
};

// Export All Log Activity Models
module.exports.logActivityModels = {
    addActivity,
};
