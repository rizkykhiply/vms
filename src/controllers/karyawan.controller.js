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
                message: 'Not Found',
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
        const getDivisi = await models.divisiModels.getAllDivisi();
        const getFormatDivisi = Object.values(...getDivisi);

        const getData = [
            ['idDivisi', 'nama', 'noInduk', 'noPolisi', 'noKartu'],
            ['1', 'Budi Santoso', '123127780', 'B1234ABC', '123123001'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['\r'],
            ['List Divisi'],
            ['id', 'divisi'],
            getFormatDivisi,
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
        const getImage = getBody?.image;

        const getKaryawan = await models.karyawanModels.getKaryawan(getId);

        if (!getKaryawan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        const image = validateImage({
            image: getImage,
        });

        await models.karyawanModels.updateKaryawan({
            id: getId,
            idDivisi: getBody.idDivisi,
            nama: getBody.nama,
            noInduk: getBody.noInduk,
            noPolisi: getBody.noPolisi,
            noKartu: getBody.noKartu,
            image: image,
            tglRegistrasi: getBody.tglRegistrasi,
            status: getBody.status,
        });

        return res.status(201).send({
            statusCode: 201,
            message: 'Updated',
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
                message: 'Not Found',
            });
        }

        await models.karyawanModels.deleteKaryawan(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};
