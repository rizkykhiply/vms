// Import Modules
const joi = require('joi');

// Define Create  Master Barang Pipe
const createMasterBarangPipe = joi.object({
    idTypeBarang: joi.number().required(),
    nama: joi.string().required(),
});

// Define Create Master Type Barang Pipe
const createMasterTypeBarangPipe = joi.object({
    nama: joi.string().required(),
});

// Define Create Master Kendaraan Pipe
const createMasterKendaraanPipe = joi.object({
    nama: joi.string().required(),
});

// Define Create Master Divisi Pipe
const createMasterDivisiPipe = joi.object({
    nama: joi.string().required(),
});

// Define Create Master Contractor Pipe
const createMasterContractorPipe = joi.object({
    nama: joi.string().required(),
});

// Define Update Master Barang Pipe
const updateMasterBarangPipe = joi.object({
    idTypeBarang: joi.number().required(),
    nama: joi.string().required(),
    status: joi.number(),
});

// Define Update Master Type Barang Pipe
const updateMasterTypeBarangPipe = joi.object({
    nama: joi.string().required(),
    status: joi.number(),
});

// Define Update Master Kendaraan Pipe
const updateMasterKendaraanPipe = joi.object({
    nama: joi.string().required(),
    status: joi.number(),
});

// Define Update Master Divisi Pipe
const updateMasterDivisiPipe = joi.object({
    nama: joi.string().required(),
    status: joi.number(),
});

// Define Update Master Contractor Pipe
const updateMasterContractorPipe = joi.object({
    nama: joi.string().required(),
    status: joi.number(),
});

// Export All Master Pipe
module.exports = {
    createMasterBarangPipe,
    createMasterTypeBarangPipe,
    createMasterKendaraanPipe,
    createMasterDivisiPipe,
    createMasterContractorPipe,
    updateMasterBarangPipe,
    updateMasterTypeBarangPipe,
    updateMasterKendaraanPipe,
    updateMasterDivisiPipe,
    updateMasterContractorPipe,
};
