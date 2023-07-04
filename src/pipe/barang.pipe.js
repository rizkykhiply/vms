// Import Modules
const joi = require('joi');

// Define Edit Barang Pipe
const editBarangPipe = joi.object({
    idKendaraan: joi.number().required(),
    idBarang: joi.number().required(),
    namaLengkap: joi.string().required(),
    nik: joi
        .string()
        .length(16)
        .pattern(new RegExp(/[0-9]$/))
        .required(),
    namaInstansi: joi.string().required(),
    noPolisi: joi.string().required(),
    tglRegistrasi: joi.string().required(),
    status: joi.number().required(),
});

// Export All Barang Pipe
module.exports = {
    editBarangPipe,
};
