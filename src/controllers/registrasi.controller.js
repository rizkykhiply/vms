// Import Modules
const appRoot = require('app-root-path');

// Import config
const { validateImage } = require('../config/helper.conf');
const { UPLOAD_FILE, UPLOAD_URL } = require('../config/constant.conf');

// Import Consumer
const { createRegistrasiQueue } = require('../consumer/registrasi.consumer');

// Import Models
const { models } = require('../models');

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

        if (getImages.length === 0) {
            throw new Error('Process Image Failed');
        }

        const [imageScan, imageCam] = getImages;

        await models.registrasiModels.createRegistrasi({
            idUser: getUser.id,
            idKendaraan: getBody.idKendaraan,
            idKios: getBody.idKios,
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
        const getImageCam = getBody.imageCam;

        const getPath = `${appRoot}/..${UPLOAD_FILE}`;
        const getImages = validateImage({
            path: getPath,
            imageCam: getImageCam,
        });

        if (getImages.length === 0) {
            throw new Error('Process Image Failed');
        }

        const [imageCam] = getImages;

        const addQueue = await createRegistrasiQueue.add(
            'Registrasi-Process-Queue',
            {
                idUser: getBody.idUser,
                idKendaraan: getBody.idKendaraan,
                idBarang: getBody.idBarang,
                idKios: getBody.idKios,
                namaLengkap: null,
                nik: null,
                namaInstansi: null,
                noPolisi: null,
                tujuan: null,
                imageScan: null,
                imageCam: `${UPLOAD_URL}/${imageCam}`,
                kodeQr: getBody.kodeQr,
                tglRegistrasi: getBody.tglRegistrasi,
                isRegis: 2,
            },
            { attempts: 0, timeout: 5000 },
        );

        const resultQueue = await addQueue.finished();

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
            data: resultQueue,
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
