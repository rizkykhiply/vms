// Import Modules
const joi = require('joi');

// Define Registrasi Visitor Pipe
const registrasiVisitorPipe = joi.object({
    idKendaraan: joi.number().required(),
    namaLengkap: joi.string().required(),
    nik: joi
        .string()
        .length(16)
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
    idUser: joi.number().required(),
    idKendaraan: joi.number().required(),
    idBarang: joi.number().required(),
    idKios: joi.number().required(),
    imageCam: joi.string().required(),
    kodeQr: joi.string().required(),
    tglRegistrasi: joi.string().required(),
});

// Define Registrasi Karyawan Pipe
const registrasiKaryawanPipe = joi.object({
    idDivisi: joi.number().required(),
    nama: joi.string().required(),
    noInduk: joi.string().required(),
    noPolisi: joi.string().required(),
    noKartu: joi.string().required(),
    tglRegistrasi: joi.string().required(),
});

// Export All Registrasi Pipe
module.exports = {
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
};
