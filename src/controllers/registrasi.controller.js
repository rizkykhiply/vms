// Import Modules
const appRoot = require('app-root-path');
const fs = require('fs');

// Import Models
const { models } = require('../models');

// Define Upload File
const UPLOAD_FILE = process.env.UPLOAD_FILE;

// Define Registrasi Controller
module.exports.registrasiController = async (req, res, next) => {
    try {
        const getParams = req.params;
        const getBody = req.body;
        const getUser = req.user;

        const getNik = getBody.nik;
        const getImageScan = getBody.imageScan;
        const getImageCam = getBody.imageCam;

        if (getNik !== 16) {
            return res.status(400).send({
                statusCode: 400,
                message: 'Bad Request',
            });
        }

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

        await models.registrasiModels.createRegistrasi({
            idUser: getUser?.id || 1,
            idKendaraan: getBody.idKendaraan,
            idBarang: +getParams.type === 1 ? null : getBody.idBarang,
            waktu: getBody.waktu,
            namaLengkap: getBody.namaLengkap,
            nik: getNik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            tujuan: +getParams.type === 1 ? getBody.tujuan : null,
            imageScan: imageScan,
            imageCam: imageCam,
            kodeQr: getBody.kodeQr,
            isRegis: getParams.type,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};
