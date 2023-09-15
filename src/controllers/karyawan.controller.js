// Import Modules
const csv = require('fast-csv');

// Import Config
const { validatePagination, validateImage } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Get All Karyawan Controller
module.exports.getKaryawanController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.karyawanModels.getCountKaryawan(getPagination);
        const getKaryawan = await models.karyawanModels.getAllKaryawan(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Succes',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getKaryawan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get Detail Karyawan Controller
module.exports.getDetailKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getKaryawan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get Download Karyawan Controller
module.exports.getDownloadKaryawanController = async (req, res, next) => {
    try {
        const [getDivisi, getContractor] = await Promise.all([models.divisiModels.getAllDivisi(), models.contractorModels.getAllContractor()]);
        const listDivisi = getDivisi.map((value) => [value.id, value.nama]);
        const listContractor = getContractor.map((value) => [value.id, value.nama]);

        const getData = [
            ['idDivisi', 'idContractor', 'nama', 'noInduk', 'noPolisi', 'noKartu'],
            ['1', '0', 'Budi Santoso', '123127780', 'B1234ABC', '123123001'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['============= TOLONG HAPUS SEBELUM IMPORT DATA ============='],
            ['\r'],
            ['*****LIST MASTER DIVISI'],
            ['id', 'divisi'],
            ...listDivisi,
            ['\r'],
            ['*****LIST MASTER CONTRACTOR'],
            ['id', 'contractor'],
            ...listContractor,
        ];

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment;filename=sample-import-karyawan.csv');

        csv.writeToStream(res, getData, { headers: true });
    } catch (error) {
        next(error);
    }
};

// Define Edit Karyawan Controller
module.exports.editKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;

        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        const getNoKartu = getBody.noKartu;
        const checkNoKartu = await models.karyawanModels.getNoKartuKaryawan(getNoKartu);

        if (checkNoKartu) {
            const getCheckNoKartuId = checkNoKartu.id;
            if (+getId !== +getCheckNoKartuId) {
                return res.status(400).send({
                    statusCode: 400,
                    message: 'No kartu sudah terdaftar',
                });
            }
        }

        let saveImage = '';
        const getImage = getBody?.image;
        const getImageKaryawan = getKaryawan?.image;
        const checkImage = getImage ? getImage : null;

        if (checkImage)
            saveImage = validateImage({
                image: checkImage,
            });

        await models.karyawanModels.updateKaryawan({
            id: getId,
            idDivisi: getBody.idDivisi,
            idContractor: +getBody.idContractor ? getBody.idContractor : null,
            nama: getBody.nama,
            noInduk: getBody.noInduk,
            noPolisi: getBody.noPolisi,
            noKartu: getBody.noKartu,
            image: saveImage ? saveImage : getImageKaryawan,
            tglRegistrasi: getBody.tglRegistrasi,
            status: getBody.status,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di update',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Karyawan Controller
module.exports.deleteKaryawanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.karyawanModels.deleteKaryawan(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
        });
    } catch (error) {
        next(error);
    }
};
