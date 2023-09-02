// Import Modules
const joi = require('joi');

// Define Edit Visitor Pipe
const editVisitorPipe = joi.object({
    idKendaraan: joi.number().required(),
    namaLengkap: joi.string().required(),
    nik: joi
        .string()
        .pattern(new RegExp(/[0-9]$/))
        .required(),
    namaInstansi: joi.string().required(),
    noPolisi: joi.string().required(),
    tujuan: joi.string().required(),
    notes: joi.string().optional().allow(''),
    tglRegistrasi: joi.string().required(),
    status: joi.number().required(),
});

// Export All Visitor Pipe
module.exports = {
    editVisitorPipe,
};
