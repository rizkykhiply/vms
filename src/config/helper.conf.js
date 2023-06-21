// Import Modules
const bcrypt = require('bcrypt');
const fs = require('fs');

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
    const getPath = params.path;
    const getImageScan = params.imageScan;
    const getImageCam = params.imageCam;

    if (!fs.existsSync(getPath)) {
        fs.mkdirSync(getPath, { recursive: true });
    }

    const getImages = [getImageScan, getImageCam];
    const getFiles = [];

    for (let i = 0; i < getImages.length; i++) {
        const getImage = getImages[i];

        const getCurrDate = new Date().getTime();
        const getRandChar = this.validateRandomChar(8, 'alphanumeric');
        const getFilename = `${getCurrDate}_${getRandChar}.jpeg`;
        const getFile = `${getPath}/${getFilename}`;

        getFiles.push(getFilename);

        fs.writeFileSync(getFile, getImage, 'base64');
    }

    return getFiles;
};
