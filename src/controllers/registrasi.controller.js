// Import Modules
const appRoot = require('app-root-path');

// Import config
const { validateImage } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Upload File
const UPLOAD_FILE = process.env.UPLOAD_FILE;
const UPLOAD_URL = process.env.UPLOAD_URL;

// Define Registrasi Visitor Controller
module.exports.registrasiVisitorController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getUser = req.user;
        const getImageScan = getBody.imageScan;
        const getImageCam = getBody.imageCam;

        const getPath = `${appRoot}/..${UPLOAD_FILE}`;
        const getImages = validateImage({
            path: getPath,
            imageScan: getImageScan,
            imageCam: getImageCam,
        });

        const [imageScan, imageCam] = getImages;

        await models.registrasiModels.createRegistrasi({
            idUser: getUser.id,
            idKendaraan: getBody.idKendaraan,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            tujuan: getBody.tujuan,
            imageScan: `${UPLOAD_URL}/${imageScan}`,
            imageCam: `${UPLOAD_URL}/${imageCam}`,
            kodeQr: getBody.kodeQr,
            tglRegistrasi: getBody.tglRegistrasi,
            isRegis: 1,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Registrasi Barang Controller
module.exports.registrasiBarangController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getImageScan = getBody.imageScan;
        const getImageCam = getBody.imageCam;

        const getPath = `${appRoot}/..${UPLOAD_FILE}`;
        const getImages = validateImage({
            path: getPath,
            imageScan: getImageScan,
            imageCam: getImageCam,
        });

        const [imageScan, imageCam] = getImages;

        await models.registrasiModels.createRegistrasi({
            idUser: getBody.idUser,
            idKendaraan: getBody.idKendaraan,
            idBarang: getBody.idBarang,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            imageScan: `${UPLOAD_URL}/${imageScan}`,
            imageCam: `${UPLOAD_URL}/${imageCam}`,
            kodeQr: getBody.kodeQr,
            tglRegistrasi: getBody.tglRegistrasi,
            isRegis: 2,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Registrasi Karyawan Controller
module.exports.registrasiKaryawanController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.karyawanModels.createKaryawan({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};
