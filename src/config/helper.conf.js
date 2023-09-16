// Import Modules
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const appRoot = require('app-root-path');
const fs = require('fs');

// Import Config
const { UPLOAD_FILE, UPLOAD_URL } = require('./constant.conf');

module.exports.validateTime = (params) => {
    const getRequest = params?.request;
    const getType = params?.type;
    const getValue = params?.value;
    const getUnit = params?.unit;

    if (!dayjs(getRequest).isValid()) return '';

    switch (getType) {
        case 'date':
            return dayjs(getRequest).format('YYYY-MM-DD');

        case 'date-time-1':
            return dayjs(getRequest).format('YYYY-MM-DD HH:mm:ss');

        case 'date-time-2':
            return dayjs(getRequest).format('YYYYMMDDHHmmss');

        case 'date-time-3':
            return dayjs(getRequest).format('YYYYMMDD');

        case 'date-time-4':
            return dayjs(getRequest).format('DD MMMM YYYY HH:mm:ss');

        case 'date-start':
            return dayjs(getRequest).startOf('month').format('YYYY-MM-DD');

        case 'date-add':
            if (getValue || getUnit) return '';
            return dayjs(getRequest).add(getValue, getUnit).format('YYYY-MM-DD');

        case 'date-time-add':
            if (getValue || getUnit) return '';
            return dayjs(getRequest).add(getValue, getUnit).format('YYYY-MM-DD HH:mm:ss');

        case 'date-subs':
            if (getValue || getUnit) return '';
            return dayjs(getRequest).subtract(getValue, getUnit).format('YYYY-MM-DD');

        case 'date-time-subs':
            if (getValue || getUnit) return '';
            return dayjs(getRequest).subtract(getValue, getUnit).format('YYYY-MM-DD HH:mm:ss');
    }
};

// Define Validate Password
module.exports.validateHashPassword = async (request) => {
    return await bcrypt.hash(request, 10);
};

// Define Validate Random Character
module.exports.validateRandomChar = (request, type) => {
    let characters = '';
    let charactersResult = '';

    switch (type) {
        case 'alpha':
            characters = 'qwertyuiopasdfghjklzxcvbnm';
            break;

        case 'numeric':
            characters = '1234567890';
            break;

        case 'alphanumeric':
            characters = '1234567890qwertyuiopasdfghjklzxcvbnm';
            break;
    }

    for (let index = 0; index < request; index++) {
        const random = Math.floor(Math.random() * characters.length);
        charactersResult += characters[random];
    }

    return charactersResult.toUpperCase();
};

// Define Validate Image
module.exports.validateImage = (params) => {
    const getImage = params.image;
    const getPath = `${appRoot}/..${UPLOAD_FILE}`;

    if (!fs.existsSync(getPath)) {
        fs.mkdirSync(getPath, { recursive: true });
    }

    const getCurrDate = new Date().getTime();
    const getRandChar = this.validateRandomChar(8, 'alphanumeric');
    const getFilename = `${getCurrDate}_${getRandChar}.jpeg`;
    const getFile = `${getPath}/${getFilename}`;

    fs.writeFileSync(getFile, getImage, 'base64');

    return `${UPLOAD_URL}/${getFilename}`;
};

// Define Validate Pagination
module.exports.validatePagination = (params) => {
    const getCurrentPage = +params.currentPage || 1;
    const getLimit = +params.limit || 10;
    const getSkip = (getCurrentPage - 1) * getLimit;
    const getSort = params?.sort?.toLowerCase() || 'DESC';
    const getSearch = params?.search?.toLowerCase() || '';
    const getStartDate = this.validateTime({ request: params?.startDate || '', type: 'date' });
    const getEndDate = this.validateTime({ request: params?.endDate || '', type: 'date' });

    return {
        pagination: `LIMIT ${getLimit} OFFSET ${getSkip}`,
        currentPage: getCurrentPage,
        limit: getLimit,
        sort: getSort,
        search: getSearch,
        startDate: getStartDate,
        endDate: getEndDate,
    };
};

// Define Validate Pagination Filter
module.exports.validatePaginationFilter = (params) => {
    const getStartDate = params.startDate;
    const getEndDate = params.endDate;
    const getColumn = params.column;

    if (getStartDate && getEndDate) {
        return `AND ${getColumn} BETWEEN '${getStartDate}' AND '${getEndDate}'`;
    }

    return '';
};
