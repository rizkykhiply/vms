// Import Config
const { validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Get All Barang Controller
module.exports.getBarangController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.registrasiModels.getCountRegistrasiBarang(getPagination);
        const getBarang = await models.registrasiModels.getAllRegistrasiBarang(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Get Detail Barang Controller
module.exports.getDetailBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBarang = await models.registrasiModels.getRegistrasiBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Edit Barang Controller
module.exports.editBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getUser = req.user;
        const getBody = req.body;

        const getBarang = await models.registrasiModels.getRegistrasiBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.registrasiModels.updateRegistrasi({
            id: getId,
            idUser: getUser.id,
            idKendaraan: getBody.idKendaraan,
            idBarang: getBody.idBarang,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
            notes: getBody.notes,
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

// Define Delete Barang Controller
module.exports.deleteBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBarang = await models.registrasiModels.getRegistrasiBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.registrasiModels.deleteRegistrasi(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
        });
    } catch (error) {
        next(error);
    }
};
