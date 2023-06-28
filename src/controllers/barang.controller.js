// Import Models
const { models } = require('../models');

// Define Get All Barang Controller
module.exports.getBarangController = async (req, res, next) => {
    try {
        const getBarang = await models.registrasiModels.getAllRegistrasiBarang();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
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
                message: 'Not Found',
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
        const getBody = req.body;

        const getBarang = await models.registrasiModels.getRegistrasiBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.registrasiModels.updateRegistrasi({
            id: getId,
            idUser: getBody.idUser,
            idKendaraan: getBody.idKendaraan,
            idBarang: getBody.idBarang,
            namaLengkap: getBody.namaLengkap,
            nik: getBody.nik,
            namaInstansi: getBody.namaInstansi,
            noPolisi: getBody.noPolisi,
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
