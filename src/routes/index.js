// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validationMiddleware } = require('../middlewares/validation.middleware');

// Import Pipes
const {
    authLoginPipe,
    masterKendaraanPipe,
    masterBarangPipe,
    masterDivisiPipe,
    registrasiVisitorPipe,
    registrasiBarangPipe,
    registrasiKaryawanPipe,
    editUserPipe,
    createUserPipe,
    editKaryawanPipe,
    editVisitorPipe,
    editBarangPipe,
} = require('../pipe');

// Import Auth Controllers
const { authLoginController, authLogoutController, authCheckController } = require('../controllers/auth.controller');

// Import Master Controllers
const {
    masterBarangController,
    masterKendaraanController,
    masterDivisiController,
    createMasterBarangController,
    createMasterKendaraanController,
    createMasterDivisiController,
} = require('../controllers/master.controller');

// Import Registrasi Controllers
const {
    registrasiVisitorController,
    registrasiBarangController,
    registrasiKaryawanController,
} = require('../controllers/registrasi.controller');

// Import User Controllers
const { getUsersController, getUserController, editUserController, createUserController } = require('../controllers/user.controller');

// Import Karyawan Controller
const { getKaryawanController, getDetailKaryawanController, editKaryawanController } = require('../controllers/karyawan.controller');

// Import Visitor Controller
const { getVisitorsController, getVisitorController, editVisitorController } = require('../controllers/visitor.controller');

// Import Barang Controller
const { getBarangController, getDetailBarangController, editBarangController } = require('../controllers/barang.controller');

// Define Router
const router = express.Router();

// Define Route Auth Controller
router.get('/auth/logout', authMiddleware, authLogoutController);
router.get('/auth/check', authMiddleware, authCheckController);
router.post('/auth/login', validationMiddleware(authLoginPipe), authLoginController);

// Define Route Master Controller
router.get('/master/barang', authMiddleware, masterBarangController);
router.get('/master/kendaraan', authMiddleware, masterKendaraanController);
router.get('/master/divisi', authMiddleware, masterDivisiController);
router.post('/master/create/kendaraan', authMiddleware, validationMiddleware(masterKendaraanPipe), createMasterKendaraanController);
router.post('/master/create/barang', authMiddleware, validationMiddleware(masterBarangPipe), createMasterBarangController);
router.post('/master/create/divisi', authMiddleware, validationMiddleware(masterDivisiPipe), createMasterDivisiController);

// Define Route Registrasi Controller
router.post('/register/visitor', authMiddleware, validationMiddleware(registrasiVisitorPipe), registrasiVisitorController);
router.post('/register/barang', validationMiddleware(registrasiBarangPipe), registrasiBarangController);
router.post('/register/karyawan', authMiddleware, validationMiddleware(registrasiKaryawanPipe), registrasiKaryawanController);

// Define Route User Controller
router.get('/user', authMiddleware, getUsersController);
router.get('/user/:id', authMiddleware, getUserController);
router.patch('/user/:id', authMiddleware, validationMiddleware(editUserPipe), editUserController);
router.post('/user/create', authMiddleware, validationMiddleware(createUserPipe), createUserController);

// Define Route Karyawan Controller
router.get('/karyawan', authMiddleware, getKaryawanController);
router.get('/karyawan/:id', authMiddleware, getDetailKaryawanController);
router.patch('/karyawan/:id', authMiddleware, validationMiddleware(editKaryawanPipe), editKaryawanController);

// Define Route Visitor Controller
router.get('/visitor', authMiddleware, getVisitorsController);
router.get('/visitor/:id', authMiddleware, getVisitorController);
router.patch('/visitor/:id', authMiddleware, validationMiddleware(editVisitorPipe), editVisitorController);

// Define Route Barang Controller
router.get('/barang', authMiddleware, getBarangController);
router.get('/barang/:id', authMiddleware, getDetailBarangController);
router.patch('/barang/:id', authMiddleware, validationMiddleware(editBarangPipe), editBarangController);

// Export Router
module.exports = {
    router,
};
