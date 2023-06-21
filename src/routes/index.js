// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validationMiddleware } = require('../middlewares/validation.middleware');

// Import Pipes
const { authLoginPipe, authRegisterPipe } = require('../pipe/auth.pipe');
const { masterBarangPipe, masterKendaraanPipe, masterDivisiPipe } = require('../pipe/master.pipe');
const { registrasiVisitorPipe, registrasiBarangPipe, registrasiKaryawanPipe } = require('../pipe/registrasi.pipe');

// Import Auth Controllers
const { authLoginController, authLogoutController, authRegisterController } = require('../controllers/auth.controller');

// Import Master Controllers
const {
    masterBarangController,
    masterKendaraanController,
    createMasterBarangController,
    createMasterKendaraanController,
    createMasterDivisiController,
} = require('../controllers/master.controller');

// Import Visitor Controllers
const {
    registrasiVisitorController,
    registrasiBarangController,
    registrasiKaryawanController,
} = require('../controllers/registrasi.controller');

// Define Router
const router = express.Router();

// Define Router Auth Controller
router.get('/auth/logout', authMiddleware, authLogoutController);
router.post('/auth/register', validationMiddleware(authRegisterPipe), authRegisterController);
router.post('/auth/login', validationMiddleware(authLoginPipe), authLoginController);

// Define Route Master Controller
router.get('/master/barang', authMiddleware, masterBarangController);
router.get('/master/kendaraan', authMiddleware, masterKendaraanController);
router.post('/master/create/kendaraan', authMiddleware, validationMiddleware(masterKendaraanPipe), createMasterKendaraanController);
router.post('/master/create/barang', authMiddleware, validationMiddleware(masterBarangPipe), createMasterBarangController);
router.post('/master/create/divisi', authMiddleware, validationMiddleware(masterDivisiPipe), createMasterDivisiController);

// Define Router Visitor Controller
router.post('/register/visitor', authMiddleware, validationMiddleware(registrasiVisitorPipe), registrasiVisitorController);
router.post('/register/barang', validationMiddleware(registrasiBarangPipe), registrasiBarangController);
router.post('/register/karyawan', authMiddleware, validationMiddleware(registrasiKaryawanPipe), registrasiKaryawanController);

// Export Router
module.exports = { router };
