// Import All Models
const { barangModels } = require('./barang.model');
const { divisiModels } = require('./divisi.model');
const { karyawanModels } = require('./karyawan.model');
const { kendaraanModels } = require('./kendaraan.model');
const { registrasiModels } = require('./registrasi.model');
const { transaksiModels } = require('./transaksi.model');
const { typeBarangModels } = require('./type-barang.model');
const { userModels } = require('./user.model');

// Export All Models
module.exports.models = {
    barangModels,
    divisiModels,
    karyawanModels,
    kendaraanModels,
    registrasiModels,
    transaksiModels,
    typeBarangModels,
    userModels,
};
