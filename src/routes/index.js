// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');

// Import Auth Controllers
const { authLoginController, authLogoutController } = require('../controllers/auth.controller');

// Import Master Controllers
const { masterBarangController, masterKendaraanController } = require('../controllers/master.controller');

// Import Visitor Controllers
const { registrasiController } = require('../controllers/registrasi.controller');

// Define Router
const router = express.Router();

// Define Router Auth Controller
router.get('/auth/logout', authMiddleware, authLogoutController);
router.post('/auth/login', authLoginController);

// Define Route Master Controller
router.get('/master/barang', authMiddleware, masterBarangController);
router.get('/master/kendaraan', authMiddleware, masterKendaraanController);

// Define Router Visitor Controller
router.post('/register/:type', authMiddleware, registrasiController);

// Export Router
module.exports = { router };
