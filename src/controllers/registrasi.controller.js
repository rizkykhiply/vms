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
            message: 'Data berhasil dibuat',
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

        const getAntrianBarang = await models.barangModels.getAntrianBarang(getIdBarang);

        if (!getAntrianBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        const addQueue = await createRegistrasiQueue.add(
            'Registrasi-Process-Queue',
            {
                idUser: null,
                idKendaraan: null,
                idBarang: getBody.idBarang,
                idKios: getBody.idKios,
                namaLengkap: null,
                nik: null,
                namaInstansi: null,
                noPolisi: null,
                tujuan: null,
                imageScan: null,
                imageCam: null,
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
            message: 'Data berhasil dibuat',
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
        const getImage = getBody?.image;

        const getNoKartu = await models.karyawanModels.getNoKartuKaryawan(getBody.noKartu);

        if (getNoKartu) {
            return res.status(400).send({
                statusCode: 400,
                message: 'No kartu sudah terdaftar',
            });
        }

        let saveImage = '';

        if (getImage) {
            saveImage = validateImage({
                image: getImage,
            });
        }

        await models.karyawanModels.createKaryawan({ ...getBody, idContractor: +getBody.idContractor ? getBody.idContractor : null, image: saveImage });

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil dibuat',
        });
    } catch (error) {
        next(error);
    }
};

// Define Registrasi Import Karyawan Controller
module.exports.registrasiImportKaryawanController = async (req, res, next) => {
    try {
        const getPath = req?.file?.path;
        fs.createReadStream(getPath)
            .pipe(csv.parse({ headers: true, delimiter: ',', trim: true }))
            .on('error', (error) => {
                console.log(error);
            })
            .on('data', async (rows) => {
                await models.karyawanModels
                    .createImportKaryawan({ ...rows, idContractor: +rows.idContractor ? rows.idContractor : null })
                    .then((value) => value)
                    .catch((error) => console.log(error));
            })
            .on('end', () => {
                fs.unlinkSync(getPath);
            });

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di import',
        });
    } catch (error) {
        next(error);
    }
};
