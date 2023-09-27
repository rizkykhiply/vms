// Import Config
const { validatePagination } = require('../config/helper.conf');

// Import Models
const { models } = require('../models');

// Define Master Barang Controller
module.exports.masterBarangController = async (req, res, next) => {
    try {
        const [getBarang, getTypeBarang] = await Promise.all([models.barangModels.getAllBarang(), models.typeBarangModels.getAllTypeBarang()]);

        let getListBarang = [];

        for (let i = 0; i < getTypeBarang.length; i++) {
            getListBarang.push({
                id: getTypeBarang[i].id,
                typeBarang: getTypeBarang[i].nama,
                data: [],
            });
            for (let j = 0; j < getBarang.length; j++) {
                const idBarang = getBarang[j].id;
                const typeBarang = getBarang[j].typeBarang;
                const namaBarang = getBarang[j].barang;
                if (getListBarang[i].typeBarang === typeBarang) {
                    getListBarang[i].data.push({ id: idBarang, barang: namaBarang });
                }
            }
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

// Define Master Contractor Controller
module.exports.masterContractorController = async (req, res, next) => {
    try {
        const getContractor = await models.contractorModels.getAllContractor();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getContractor,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Access Controller
module.exports.masterAccessController = async (req, res, next) => {
    try {
        const getAccess = await models.accessModels.getAllAccess();
        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getAccess,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Admin Barang Controller
module.exports.masterAdminBarangController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.barangModels.getCountBarang();
        const getBarang = await models.barangModels.getAllAdminBarang(getPagination);
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

// Define Master Admin Type Barang Controller
module.exports.masterAdminTypeBarangController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.typeBarangModels.getCountTypeBarang();
        const getTypeBarang = await models.typeBarangModels.getAllAdminTypeBarang(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getTypeBarang,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Admin Kendaraan Controller
module.exports.masterAdminKendaraanController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.kendaraanModels.getCountKendaraan();
        const getKendaraan = await models.kendaraanModels.getAllAdminKendaraan(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getKendaraan,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Admin Divisi Controller
module.exports.masterAdminDivisiController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.divisiModels.getCountDivisi();
        const getDivisi = await models.divisiModels.getAllAdminDivisi(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getDivisi,
        });
    } catch (error) {
        next(error);
    }
};

// Define Master Admin Contractor Controller
module.exports.masterAdminContractorController = async (req, res, next) => {
    try {
        const getPagination = validatePagination({ ...req.query });
        const getCount = await models.contractorModels.getCountContractor();
        const getContractor = await models.contractorModels.getAllAdminContractor(getPagination);
        const getTotalPage = Math.ceil(getCount / getPagination.limit);

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            currentPage: getPagination.currentPage,
            totalPage: getTotalPage,
            data: getContractor,
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

// Define Master Detail Type Barang Controller
module.exports.masterDetailTypeBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getTypeBarang = await models.typeBarangModels.getTypeBarang(getId);

        if (!getTypeBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
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
                message: 'Data tidak ditemukan',
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
                message: 'Data tidak ditemukan',
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

// Define Master Detail Contractor Controller
module.exports.masterDetailContractorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getContractor = await models.contractorModels.getContractor(getId);

        if (!getContractor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        return res.status(200).send({
            statusCode: 200,
            message: 'Success',
            data: getContractor,
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
            message: 'Data berhasil dibuat',
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
            message: 'Data berhasil dibuat',
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
            message: 'Data berhasil dibuat',
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
            message: 'Data berhasil dibuat',
        });
    } catch (error) {
        next(error);
    }
};

// Define Create Master Contractor Controller
module.exports.createMasterContractorController = async (req, res, next) => {
    try {
        const getBody = req.body;
        await models.contractorModels.createContractor({ ...getBody });

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil dibuat',
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
                message: 'Data tidak ditemukan',
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
            message: 'Data berhasil di update',
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
                message: 'Data tidak ditemukan',
            });
        }

        await models.typeBarangModels.updateTypeBarang({
            id: getId,
            nama: getBody.nama,
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

// Define Update Master Kendaraan Controller
module.exports.updateMasterKendaraanController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getKendaraan = await models.kendaraanModels.getKendaraan(getId);

        if (!getKendaraan) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.kendaraanModels.updateKendaraan({
            id: getId,
            nama: getBody.nama,
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

// Define Update Master Divisi Controller
module.exports.updateMasterDivisiController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getDivisi = await models.divisiModels.getDivisi(getId);

        if (!getDivisi) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.divisiModels.updateDivisi({
            id: getId,
            nama: getBody.nama,
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

// Define Update Master Contractor Controller
module.exports.updateMasterContractorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBody = req.body;
        const getContractor = await models.contractorModels.getContractor(getId);

        if (!getContractor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.contractorModels.updateContractor({
            id: getId,
            nama: getBody.nama,
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

// Define Delete Master Barang Controller
module.exports.deleteMasterBarangController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getBarang = await models.barangModels.getBarang(getId);

        if (!getBarang) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.barangModels.deleteBarang(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
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
                message: 'Data tidak ditemukan',
            });
        }

        await models.typeBarangModels.deleteTypeBarang(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
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
                message: 'Data tidak ditemukan',
            });
        }

        await models.kendaraanModels.deleteKendaraan(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
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
                message: 'Data tidak ditemukan',
            });
        }

        await models.divisiModels.deleteDivisi(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
        });
    } catch (error) {
        next(error);
    }
};

// Define Delete Master Contractor Controller
module.exports.deleteMasterContractorController = async (req, res, next) => {
    try {
        const getId = req.params.id;
        const getContractor = await models.contractorModels.deleteContractor(getId);

        if (!getContractor) {
            return res.status(404).send({
                statusCode: 404,
                message: 'Data tidak ditemukan',
            });
        }

        await models.contractorModels.deleteContractor(getId);

        return res.status(201).send({
            statusCode: 201,
            message: 'Data berhasil di delete',
        });
    } catch (error) {
        next(error);
    }
};
