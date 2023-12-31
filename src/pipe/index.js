// Import All Pipes
const { authLoginPipe } = require('./auth.pipe');
const { editBarangPipe } = require('./barang.pipe');
const { editKaryawanPipe } = require('./karyawan.pipe');
const {
    createMasterKendaraanPipe,
    createMasterBarangPipe,
    createMasterTypeBarangPipe,
    createMasterDivisiPipe,
    createMasterContractorPipe,
    createMasterPosPipe,
    updateMasterKendaraanPipe,
    updateMasterBarangPipe,
    updateMasterTypeBarangPipe,
    updateMasterDivisiPipe,
    updateMasterContractorPipe,
    updateMasterPosPipe,
} = require('./master.pipe');
const { registrasiVisitorPipe, registrasiBarangPipe, registrasiKaryawanPipe } = require('./registrasi.pipe');
const { createUserPipe, editUserPipe } = require('./user.pipe');
const { editVisitorPipe } = require('./visitor.pipe');

// Export All Pipes
module.exports = {
    authLoginPipe,
    createUserPipe,
    createMasterBarangPipe,
    createMasterTypeBarangPipe,
    createMasterDivisiPipe,
    createMasterKendaraanPipe,
    createMasterContractorPipe,
    createMasterPosPipe,
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
    editUserPipe,
    editVisitorPipe,
    editKaryawanPipe,
    editBarangPipe,
    updateMasterBarangPipe,
    updateMasterTypeBarangPipe,
    updateMasterDivisiPipe,
    updateMasterKendaraanPipe,
    updateMasterContractorPipe,
    updateMasterPosPipe,
};
