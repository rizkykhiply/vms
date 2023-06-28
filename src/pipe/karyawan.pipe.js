// Import Modules
const joi = require('joi');

// Define Edit Karyawan Pipe
const editKaryawanPipe = joi.object({
    idDivisi: joi.number().required(),
    nama: joi.string().required(),
    noInduk: joi.string().required(),
    noPolisi: joi.string().required(),
    noKartu: joi.string().required(),
    tglRegistrasi: joi.string().required(),
    status: joi.number().required(),
});

// Export All Karyawan Pipe
module.exports = { editKaryawanPipe };
