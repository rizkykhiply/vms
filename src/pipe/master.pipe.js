// Import Modules
const joi = require('joi');

// Define Master Kendaraan Pipe
const masterKendaraanPipe = joi.object({
    nama: joi.string().required(),
});

// Define Master Barang Pipe
const masterBarangPipe = joi.object({
    idTypeBarang: joi.number().required(),
    nama: joi.string().required(),
});

// Define Master Type Barang Pipe
const masterTypeBarangPipe = joi.object({
    nama: joi.string().required(),
});

// Define Master Divisi Pipe
const masterDivisiPipe = joi.object({
    nama: joi.string().required(),
});

// Export All Master Pipe
module.exports = {
    masterKendaraanPipe,
    masterBarangPipe,
    masterTypeBarangPipe,
    masterDivisiPipe,
};
