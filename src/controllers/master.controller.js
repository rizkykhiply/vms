// Import Models
const { models } = require('../models');

// Define Master Barang Controller
module.exports.masterBarangController = async (req, res, next) => {
    try {
        const [getBarang, getTypeBarang] = await Promise.all([
            models.barangModels.getAllBarang(),
            models.typeBarangModels.getAllTypeBarang(),
        ]);

        let getListBarang = {};

        for (let i = 0; i < getTypeBarang.length; i++) {
            getListBarang[getTypeBarang[i].nama] = [];
        }
        for (let j = 0; j < getBarang.length; j++) {
            const idBarang = getBarang[j].id;
            const typeBarang = getBarang[j].typeBarang;
            const namaBarang = getBarang[j].barang;
            getListBarang[typeBarang].push({ id: idBarang, barang: namaBarang });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getListBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Type Barang Controller
module.exports.masterTypeBarangController = async (req, res, next) => {
    try {
        const getTypeBarang = await models.typeBarangModels.getAllTypeBarang();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getTypeBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Kendaraan Controller
module.exports.masterKendaraanController = async (req, res, next) => {
    try {
        const getKendaraan = await models.kendaraanModels.getAllKendaraan();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getKendaraan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Divisi Controller
module.exports.masterDivisiController = async (req, res, next) => {
    try {
        const getDivisi = await models.divisiModels.getAllDivisi();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getDivisi,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Detail Barang Controller
module.exports.masterDetailBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBarang = await models.barangModels.getBarang(getId);

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

// Define Master Detail Type Barang Controller
module.exports.masterDetailTypeBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getTypeBarang = await models.typeBarangModels.getTypeBarang(getId);

        if (!getTypeBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getTypeBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Detail Kendaraan Controller
module.exports.masterDetailKendaraanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKendaraan = await models.kendaraanModels.getKendaraan(getId);

        if (!getKendaraan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getKendaraan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Detail Divisi Controller
module.exports.masterDetailDivisiController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getDivisi = await models.divisiModels.getDivisi(getId);

        if (!getDivisi) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getDivisi,
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Barang Controller
module.exports.createMasterBarangController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.barangModels.createBarang({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Type Barang Controller
module.exports.createMasterTypeBarangController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.typeBarangModels.createTypeBarang({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Kendaraan Controller
module.exports.createMasterKendaraanController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.kendaraanModels.createKendaraan({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Divisi Controller
module.exports.createMasterDivisiController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.divisiModels.createDivisi({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Created',
        });
    } catch (error) {
        next(error);
    }
};

// Define Update Master Barang Controller
module.exports.updateMasterBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getBarang = await models.barangModels.getBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.barangModels.updateBarang({
            id: getId,
            idTypeBarang: getBody.idTypeBarang,
            nama: getBody.nama,
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

// Define Update Master Type Barang Controller
module.exports.updateMasterTypeBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getTypeBarang = await models.typeBarangModels.getTypeBarang(getId);

        if (!getTypeBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.typeBarangModels.updateTypeBarang({
            id: getId,
            nama: getBody.nama,
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

// Define Update Master Kendaraan Controller
module.exports.updateMasterKendaraanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getKendaraan = await models.kendaraanModels.getKendaraan(getId);

        if (!getKendaraan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.kendaraanModels.updateKendaraan({
            id: getId,
            nama: getBody.nama,
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

// Define Update Master Divisi Controller
module.exports.updateMasterDivisiController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getDivisi = await models.divisiModels.getDivisi(getId);

        if (!getDivisi) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.divisiModels.updateDivisi({
            id: getId,
            nama: getBody.nama,
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

// Define Delete Master Barang Controller
module.exports.deleteMasterBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBarang = await models.barangModels.getBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.barangModels.deleteBarang(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Master Type Barang Controller
module.exports.deleteMasterTypeBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getTypeBarang = await models.typeBarangModels.getTypeBarang(getId);

        if (!getTypeBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.typeBarangModels.deleteTypeBarang(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Master Kendaraan Controller
module.exports.deleteMasterKendaraanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getKendaraan = await models.kendaraanModels.getKendaraan(getId);

        if (!getKendaraan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.kendaraanModels.deleteKendaraan(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Master Divisi Controller
module.exports.deleteMasterDivisiController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getDivisi = await models.divisiModels.getDivisi(getId);

        if (!getDivisi) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Not Found',
            });
        }

        await models.divisiModels.deleteDivisi(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Deleted',
        });
    } catch (error) {
        next(error);
    }
};
