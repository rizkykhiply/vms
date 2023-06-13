// Import Modules
const appRoot = require('app-root-path');
const fs = require('fs');

// Import Models
const { models } = require('../models');

// Define Upload File
const UPLOAD_FILE = process.env.UPLOAD_FILE;

// Define Visitor Register Controller
module.exports.visitorRegisterController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getImageScan = getBody.imageScan;
        const getImageCam = getBody.imageCam;

        const getDir = `${appRoot}/..${UPLOAD_FILE}`;

        if (!fs.existsSync(getDir)) {
            fs.mkdirSync(getDir, { recursive: true });
        }

        let getImages = [
            { image: getImageScan, file: `${new Date().getTime() + Math.floor(Math.random() * 100) + 1}.jpeg` },
            { image: getImageCam, file: `${new Date().getTime() + Math.floor(Math.random() * 100) + 1}.jpeg` },
        ];

        for (let i = 0; i < getImages.length; i++) {
            const getImage = getImages[i].image;
            const getFile = `${getDir}/${getImages[i].file}`;

            fs.writeFileSync(getFile, getImage, 'base64');
        }

        const [{ file: imageScan }, { file: imageCam }] = getImages;

        await models.visitorModels.createVisitor({
            idUser: getBody.idUser,
            idTypeKendaraan: getBody.idTypeKendaraan,
            idTujuan: getBody.idTujuan,
            waktu: getBody.waktu,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            imageScan: imageScan,
            imageCam: imageCam,
            kodeQr: getBody.kodeQr,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};
