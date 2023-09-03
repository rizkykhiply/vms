// Import Modules
const joi = require('joi');

// Define Edit Karyawan Pipe
const editKaryawanPipe = joi.object({
    idDivisi: joi.number().required(),
    idContractor: joi.number().optional(),
    nama: joi.string().required(),
    noInduk: joi.string().required(),
    noPolisi: joi.string().required(),
    noKartu: joi.string().required(),
    image: joi.string().optional().allow(''),
    tglRegistrasi: joi.string().required(),
    status: joi.number().required(),
});

// Export All Karyawan Pipe
module.exports = {
    editKaryawanPipe,
};
