// Import Modules
const csv = require('fast-csv');
const fs = require('fs');

// Import config
const { validateImage } = require('../config/helper.conf');

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
        const getImages = [getImageScan, getImageCam];

        const getFiles = [];

        for (let i = 0; i < getImages.length; i++) {
            const getImage = getImages[i];
            const getFile = validateImage({
                image: getImage,
            });

            getFiles.push(getFile);
        }

        const [imageScan, imageCam] = getFiles;
        await models.registrasiModels.createRegistrasi({
            idUser: getUser.id,
            idKendaraan: getBody.idKendaraan,
            idKios: getBody.idKios,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            tujuan: getBody.tujuan,
            imageScan: imageScan,
            imageCam: imageCam,
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
        const getIdBarang = getBody.idBarang;
        const getImageCam = getBody.imageCam;

        const getAntrianBarang = await models.barangModels.getAntrianBarang(getIdBarang);

        if (!getAntrianBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        const imageCam = validateImage({
            image: getImageCam,
        });

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
                imageCam: imageCam,
                kodeQr: getBody.kodeQr,
                tglRegistrasi: getBody.tglRegistrasi,
                isRegis: 2,
            },
            { attempts: 0, timeout: 5000 },
        );

        const resultQueue = await addQueue.finished();

        const responseData = {
            ...getAntrianBarang,
            ...resultQueue,
        };

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
            data: responseData,
        });
    } catch (error) {
        next(error);
    }
};

// Define Registrasi Karyawan Controller
module.exports.registrasiKaryawanController = async (req, res, next) => {
    try {
        const getBody = req.body;
        const getImage = getBody.image;

        const image = validateImage({
            image: getImage,
        });

        await models.karyawanModels.createKaryawan({ ...getBody, image });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Registrasi Import Karyawan Controller
module.exports.registrasiImportKaryawanController = async (req, res, next) => {
    try {
        const getPath = req?.file?.path;
        const getRows = [];

        fs.createReadStream(getPath)
            .pipe(csv.parse({ headers: true, delimiter: ',', trim: true }))
            .on('error', (error) => {
                console.log(error);
            })
            .on('data', async (rows) => {
                getRows.push(rows);
                if (getRows.length === 1) {
                    for (let index = 0; index < getRows.length; index++) {
                        await models.karyawanModels
                            .createImportKaryawan({ ...getRows[0] })
                            .then((value) => value)
                            .catch((error) => console.log(error));
                    }
                    getRows.splice(0, getRows.length);
                }
            })
            .on('end', () => {
                fs.unlinkSync(getPath);
            });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};
