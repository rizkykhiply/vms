// Import Modules
const joi = require('joi');

// Define Edit Barang Pipe
const editBarangPipe = joi.object({
    idKendaraan: joi.number().required(),
    idBarang: joi.number().required(),
    namaLengkap: joi.string().required(),
    nik: joi
        .string()
        .pattern(new RegExp(/[0-9]$/))
        .required(),
    namaInstansi: joi.string().required(),
    noPolisi: joi.string().required(),
    notes: joi.string().optional().allow(''),
    tglRegistrasi: joi.string().required(),
    status: joi.number().required(),
});

// Export All Barang Pipe
module.exports = {
    editBarangPipe,
};
