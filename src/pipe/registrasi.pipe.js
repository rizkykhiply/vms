// Import Modules
const joi = require('joi');

// Define Registrasi Visitor Pipe
const registrasiVisitorPipe = joi.object({
    idKendaraan: joi.number().required(),
    idKios: joi.number().required(),
    namaLengkap: joi.string().required(),
    nik: joi
        .string()
        .pattern(new RegExp(/[0-9]$/))
        .required(),
    namaInstansi: joi.string().required(),
    noPolisi: joi.string().required(),
    tujuan: joi.string().required(),
    imageScan: joi.string().required(),
    imageCam: joi.string().required(),
    kodeQr: joi.string().required(),
    tglRegistrasi: joi.string().required(),
});

// Define Registrasi Barang Pipe
const registrasiBarangPipe = joi.object({
    idBarang: joi.number().required(),
    idKios: joi.number().required(),
    kodeQr: joi.string().required(),
    tglRegistrasi: joi.string().required(),
});

// Define Registrasi Karyawan Pipe
const registrasiKaryawanPipe = joi.object({
    idDivisi: joi.number().required(),
    idContractor: joi.number().optional().allow('').allow(null),
    nama: joi.string().required(),
    noInduk: joi.string().required(),
    noPolisi: joi.string().required(),
    noKartu: joi.string().required(),
    image: joi.string().optional().allow(''),
    tglRegistrasi: joi.string().required(),
});

// Export All Registrasi Pipe
module.exports = {
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
};
