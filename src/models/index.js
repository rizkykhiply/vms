// Import All Models
const { accessModels } = require('./access.model');
const { barangModels } = require('./barang.model');
const { contractorModels } = require('./contractor.model');
const { divisiModels } = require('./divisi.model');
const { karyawanModels } = require('./karyawan.model');
const { kendaraanModels } = require('./kendaraan.model');
const { posModels } = require('./pos.model');
const { registrasiModels } = require('./registrasi.model');
const { typeBarangModels } = require('./type-barang.model');
const { userModels } = require('./user.model');
const { reportModels } = require('./report.model');

// Export All Models
module.exports.models = {
    accessModels,
    barangModels,
    contractorModels,
    divisiModels,
    karyawanModels,
    kendaraanModels,
    posModels,
    registrasiModels,
    typeBarangModels,
    userModels,
    reportModels,
};
