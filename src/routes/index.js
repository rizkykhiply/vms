// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validationMiddleware } = require('../middlewares/validation.middleware');
const { uploadMiddleware } = require('../middlewares/upload.middleware');

// Import Pipes
const {
    authLoginPipe,
    createUserPipe,
    createMasterBarangPipe,
    createMasterTypeBarangPipe,
    createMasterKendaraanPipe,
    createMasterDivisiPipe,
    createMasterContractorPipe,
    createMasterPosPipe,
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
    editUserPipe,
    editKaryawanPipe,
    editVisitorPipe,
    editBarangPipe,
    updateMasterBarangPipe,
    updateMasterTypeBarangPipe,
    updateMasterKendaraanPipe,
    updateMasterDivisiPipe,
    updateMasterContractorPipe,
    updateMasterPosPipe,
} = require('../pipe');

// Import Auth Controllers
const { authLoginController, authLogoutController, authCheckController } = require('../controllers/auth.controller');

// Import Master Controllers
const {
    masterBarangController,
    masterTypeBarangController,
    masterKendaraanController,
    masterDivisiController,
    masterContractorController,
    masterPosController,
    masterAccessController,
    masterAdminBarangController,
    masterAdminTypeBarangController,
    masterAdminKendaraanController,
    masterAdminDivisiController,
    masterAdminContractorController,
    masterAdminPosController,
    masterDetailBarangController,
    masterDetailTypeBarangController,
    masterDetailKendaraanController,
    masterDetailDivisiController,
    masterDetailContractorController,
    masterDetailPosController,
    createMasterBarangController,
    createMasterTypeBarangController,
    createMasterKendaraanController,
    createMasterDivisiController,
    createMasterContractorController,
    createMasterPosController,
    updateMasterBarangController,
    updateMasterTypeBarangController,
    updateMasterKendaraanController,
    updateMasterDivisiController,
    updateMasterContractorController,
    updateMasterPosController,
    deleteMasterBarangController,
    deleteMasterTypeBarangController,
    deleteMasterKendaraanController,
    deleteMasterDivisiController,
    deleteMasterContractorController,
    deleteMasterPosController,
} = require('../controllers/master.controller');

// Import Registrasi Controllers
const {
    registrasiVisitorController,
    registrasiBarangController,
    registrasiKaryawanController,
    registrasiImportKaryawanController,
} = require('../controllers/registrasi.controller');

// Import User Controllers
const { getUsersController, getUserController, editUserController, createUserController, deleteUserController } = require('../controllers/user.controller');

// Import Karyawan Controller
const {
    getKaryawanController,
    getDetailKaryawanController,
    getDownloadKaryawanController,
    editKaryawanController,
    deleteKaryawanController,
} = require('../controllers/karyawan.controller');

// Import Visitor Controller
const { getVisitorsController, getVisitorController, editVisitorController, deleteVisitorController } = require('../controllers/visitor.controller');

// Import Barang Controller
const { getBarangController, getDetailBarangController, editBarangController, deleteBarangController } = require('../controllers/barang.controller');

// Import Report Controller
const {
    reportTransaksiDayController,
    reportTransaksiKaryawanController,
    reportTransaksiDetailKaryawanController,
    reportTransaksiVisitorController,
    reportTransaksiCountBarangController,
    reportTransaksiKaryawanExportController,
    reportTransaksiVisitorExportController,
    reportTransaksiBarangExportController,
    reportTransaksiGateController,
} = require('../controllers/report.controller');

// Define Router
const router = express.Router();

// Define Route Auth Controller
router.get('/auth/logout', authMiddleware, authLogoutController);
router.get('/auth/check', authMiddleware, authCheckController);
router.post('/auth/login', validationMiddleware(authLoginPipe), authLoginController);

// Define Route Master Controller
router.get('/master/barang', masterBarangController);
router.get('/master/type/barang', authMiddleware, masterTypeBarangController);
router.get('/master/kendaraan', authMiddleware, masterKendaraanController);
router.get('/master/divisi', authMiddleware, masterDivisiController);
router.get('/master/contractor', authMiddleware, masterContractorController);
router.get('/master/pos', authMiddleware, masterPosController);
router.get('/master/access', authMiddleware, masterAccessController);
router.get('/master/admin/barang', authMiddleware, masterAdminBarangController);
router.get('/master/admin/type/barang', authMiddleware, masterAdminTypeBarangController);
router.get('/master/admin/kendaraan', authMiddleware, masterAdminKendaraanController);
router.get('/master/admin/divisi', authMiddleware, masterAdminDivisiController);
router.get('/master/admin/contractor', authMiddleware, masterAdminContractorController);
router.get('/master/admin/pos', authMiddleware, masterAdminPosController);
router.get('/master/barang/:id', authMiddleware, masterDetailBarangController);
router.get('/master/type/barang/:id', authMiddleware, masterDetailTypeBarangController);
router.get('/master/kendaraan/:id', authMiddleware, masterDetailKendaraanController);
router.get('/master/divisi/:id', authMiddleware, masterDetailDivisiController);
router.get('/master/contractor/:id', authMiddleware, masterDetailContractorController);
router.get('/master/pos/:id', authMiddleware, masterDetailPosController);
router.post('/master/create/barang', authMiddleware, validationMiddleware(createMasterBarangPipe), createMasterBarangController);
router.post('/master/create/type/barang', authMiddleware, validationMiddleware(createMasterTypeBarangPipe), createMasterTypeBarangController);
router.post('/master/create/kendaraan', authMiddleware, validationMiddleware(createMasterKendaraanPipe), createMasterKendaraanController);
router.post('/master/create/divisi', authMiddleware, validationMiddleware(createMasterDivisiPipe), createMasterDivisiController);
router.post('/master/create/contractor', authMiddleware, validationMiddleware(createMasterContractorPipe), createMasterContractorController);
router.post('/master/create/pos', authMiddleware, validationMiddleware(createMasterPosPipe), createMasterPosController);
router.patch('/master/update/barang/:id', authMiddleware, validationMiddleware(updateMasterBarangPipe), updateMasterBarangController);
router.patch('/master/update/type/barang/:id', authMiddleware, validationMiddleware(updateMasterTypeBarangPipe), updateMasterTypeBarangController);
router.patch('/master/update/kendaraan/:id', authMiddleware, validationMiddleware(updateMasterKendaraanPipe), updateMasterKendaraanController);
router.patch('/master/update/divisi/:id', authMiddleware, validationMiddleware(updateMasterDivisiPipe), updateMasterDivisiController);
router.patch('/master/update/contractor/:id', authMiddleware, validationMiddleware(updateMasterContractorPipe), updateMasterContractorController);
router.patch('/master/update/pos/:id', authMiddleware, validationMiddleware(updateMasterPosPipe), updateMasterPosController);
router.delete('/master/delete/barang/:id', authMiddleware, deleteMasterBarangController);
router.delete('/master/delete/type/barang/:id', authMiddleware, deleteMasterTypeBarangController);
router.delete('/master/delete/kendaraan/:id', authMiddleware, deleteMasterKendaraanController);
router.delete('/master/delete/divisi/:id', authMiddleware, deleteMasterDivisiController);
router.delete('/master/delete/contractor/:id', authMiddleware, deleteMasterContractorController);
router.delete('/master/delete/pos/:id', authMiddleware, deleteMasterPosController);

// Define Route Registrasi Controller
router.post('/register/visitor', authMiddleware, validationMiddleware(registrasiVisitorPipe), registrasiVisitorController);
router.post('/register/barang', validationMiddleware(registrasiBarangPipe), registrasiBarangController);
router.post('/register/karyawan', authMiddleware, validationMiddleware(registrasiKaryawanPipe), registrasiKaryawanController);
router.post('/register/import/karyawan', authMiddleware, uploadMiddleware('file'), registrasiImportKaryawanController);

// Define Route User Controller
router.get('/user', authMiddleware, getUsersController);
router.post('/user/create', authMiddleware, validationMiddleware(createUserPipe), createUserController);
router.get('/user/:id', authMiddleware, getUserController);
router.patch('/user/:id', authMiddleware, validationMiddleware(editUserPipe), editUserController);
router.delete('/user/:id', authMiddleware, deleteUserController);

// Define Route Karyawan Controller
router.get('/karyawan', authMiddleware, getKaryawanController);
router.get('/karyawan/download', authMiddleware, getDownloadKaryawanController);
router.get('/karyawan/:id', authMiddleware, getDetailKaryawanController);
router.patch('/karyawan/:id', authMiddleware, validationMiddleware(editKaryawanPipe), editKaryawanController);
router.delete('/karyawan/:id', authMiddleware, deleteKaryawanController);

// Define Route Visitor Controller
router.get('/visitor', authMiddleware, getVisitorsController);
router.get('/visitor/:id', authMiddleware, getVisitorController);
router.patch('/visitor/:id', authMiddleware, validationMiddleware(editVisitorPipe), editVisitorController);
router.delete('/visitor/:id', authMiddleware, deleteVisitorController);

// Define Route Barang Controller
router.get('/barang', authMiddleware, getBarangController);
router.get('/barang/:id', authMiddleware, getDetailBarangController);
router.patch('/barang/:id', authMiddleware, validationMiddleware(editBarangPipe), editBarangController);
router.delete('/barang/:id', authMiddleware, deleteBarangController);

// Define Route Report Controller
router.get('/report/trx/day', authMiddleware, reportTransaksiDayController);
router.get('/report/trx/karyawan', authMiddleware, reportTransaksiKaryawanController);
router.get('/report/trx/karyawan/detail/:id', authMiddleware, reportTransaksiDetailKaryawanController);
router.get('/report/trx/visitor', authMiddleware, reportTransaksiVisitorController);
router.get('/report/trx/barang', authMiddleware, reportTransaksiCountBarangController);
router.get('/report/trx/gate', authMiddleware, reportTransaksiGateController);
router.get('/report/trx/karyawan/export', authMiddleware, reportTransaksiKaryawanExportController);
router.get('/report/trx/visitor/export', authMiddleware, reportTransaksiVisitorExportController);
router.get('/report/trx/barang/export', authMiddleware, reportTransaksiBarangExportController);

// Export Router
module.exports = {
    router,
};
