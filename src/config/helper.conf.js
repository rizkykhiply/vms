// Import Modules
const bcrypt = require('bcrypt');
const appRoot = require('app-root-path');
const fs = require('fs');

// Import Config
const { UPLOAD_FILE, UPLOAD_URL } = require('./constant.conf');

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
