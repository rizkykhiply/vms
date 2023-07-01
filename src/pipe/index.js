// Import All Pipes
const { authLoginPipe } = require('./auth.pipe');
const { editBarangPipe } = require('./barang.pipe');
const { editKaryawanPipe } = require('./karyawan.pipe');
const { masterBarangPipe, masterTypeBarangPipe, masterDivisiPipe, masterKendaraanPipe } = require('./master.pipe');
const { registrasiVisitorPipe, registrasiBarangPipe, registrasiKaryawanPipe } = require('./registrasi.pipe');
const { createUserPipe, editUserPipe } = require('./user.pipe');
const { editVisitorPipe } = require('./visitor.pipe');

// Export All Pipes
module.exports = {
    authLoginPipe,
    editBarangPipe,
    editKaryawanPipe,
    masterBarangPipe,
    masterTypeBarangPipe,
    masterDivisiPipe,
    masterKendaraanPipe,
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
    createUserPipe,
    editUserPipe,
    editVisitorPipe,
};
