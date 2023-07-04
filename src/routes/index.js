// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validationMiddleware } = require('../middlewares/validation.middleware');

// Import Pipes
const {
    authLoginPipe,
    createUserPipe,
    createMasterBarangPipe,
    createMasterTypeBarangPipe,
    createMasterKendaraanPipe,
    createMasterDivisiPipe,
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
} = require('../pipe');

// Import Auth Controllers
const { authLoginController, authLogoutController, authCheckController } = require('../controllers/auth.controller');

// Import Master Controllers
const {
    masterBarangController,
    masterTypeBarangController,
    masterKendaraanController,
    masterDivisiController,
    masterDetailBarangController,
    masterDetailTypeBarangController,
    masterDetailKendaraanController,
    masterDetailDivisiController,
    createMasterBarangController,
    createMasterTypeBarangController,
    createMasterKendaraanController,
    createMasterDivisiController,
    updateMasterBarangController,
    updateMasterTypeBarangController,
    updateMasterKendaraanController,
    updateMasterDivisiController,
    deleteMasterBarangController,
    deleteMasterTypeBarangController,
    deleteMasterKendaraanController,
    deleteMasterDivisiController,
} = require('../controllers/master.controller');

// Import Registrasi Controllers
const { registrasiVisitorController, registrasiBarangController, registrasiKaryawanController } = require('../controllers/registrasi.controller');

// Import User Controllers
const { getUsersController, getUserController, editUserController, createUserController, deleteUserController } = require('../controllers/user.controller');

// Import Karyawan Controller
const { getKaryawanController, getDetailKaryawanController, editKaryawanController, deleteKaryawanController } = require('../controllers/karyawan.controller');

// Import Visitor Controller
const { getVisitorsController, getVisitorController, editVisitorController, deleteVisitorController } = require('../controllers/visitor.controller');

// Import Barang Controller
const { getBarangController, getDetailBarangController, editBarangController, deleteBarangController } = require('../controllers/barang.controller');

// Define Router
const router = express.Router();

// Define Route Auth Controller
router.get('/auth/logout', authMiddleware, authLogoutController);
router.get('/auth/check', authMiddleware, authCheckController);
router.post('/auth/login', validationMiddleware(authLoginPipe), authLoginController);

// Define Route Master Controller
router.get('/master/barang', authMiddleware, masterBarangController);
router.get('/master/type/barang', authMiddleware, masterTypeBarangController);
router.get('/master/kendaraan', authMiddleware, masterKendaraanController);
router.get('/master/divisi', authMiddleware, masterDivisiController);
router.get('/master/barang/:id', authMiddleware, masterDetailBarangController);
router.get('/master/type/barang/:id', authMiddleware, masterDetailTypeBarangController);
router.get('/master/kendaraan/:id', authMiddleware, masterDetailKendaraanController);
router.get('/master/divisi/:id', authMiddleware, masterDetailDivisiController);
router.post('/master/create/barang', authMiddleware, validationMiddleware(createMasterBarangPipe), createMasterBarangController);
router.post('/master/create/type/barang', authMiddleware, validationMiddleware(createMasterTypeBarangPipe), createMasterTypeBarangController);
router.post('/master/create/kendaraan', authMiddleware, validationMiddleware(createMasterKendaraanPipe), createMasterKendaraanController);
router.post('/master/create/divisi', authMiddleware, validationMiddleware(createMasterDivisiPipe), createMasterDivisiController);
router.patch('/master/update/barang/:id', authMiddleware, validationMiddleware(updateMasterBarangPipe), updateMasterBarangController);
router.patch('/master/update/type/barang/:id', authMiddleware, validationMiddleware(updateMasterTypeBarangPipe), updateMasterTypeBarangController);
router.patch('/master/update/kendaraan/:id', authMiddleware, validationMiddleware(updateMasterKendaraanPipe), updateMasterKendaraanController);
router.patch('/master/update/divisi/:id', authMiddleware, validationMiddleware(updateMasterDivisiPipe), updateMasterDivisiController);
router.delete('/master/delete/barang/:id', authMiddleware, deleteMasterBarangController);
router.delete('/master/delete/type/barang/:id', authMiddleware, deleteMasterTypeBarangController);
router.delete('/master/delete/kendaraan/:id', authMiddleware, deleteMasterKendaraanController);
router.delete('/master/delete/divisi/:id', authMiddleware, deleteMasterDivisiController);

// Define Route Registrasi Controller
router.post('/register/visitor', authMiddleware, validationMiddleware(registrasiVisitorPipe), registrasiVisitorController);
router.post('/register/barang', validationMiddleware(registrasiBarangPipe), registrasiBarangController);
router.post('/register/karyawan', authMiddleware, validationMiddleware(registrasiKaryawanPipe), registrasiKaryawanController);

// Define Route User Controller
router.get('/user', authMiddleware, getUsersController);
router.post('/user/create', authMiddleware, validationMiddleware(createUserPipe), createUserController);
router.get('/user/:id', authMiddleware, getUserController);
router.patch('/user/:id', authMiddleware, validationMiddleware(editUserPipe), editUserController);
router.delete('/user/:id', authMiddleware, deleteUserController);

// Define Route Karyawan Controller
router.get('/karyawan', authMiddleware, getKaryawanController);
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

// Export Router
module.exports = {
    router,
};
