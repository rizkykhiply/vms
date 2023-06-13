// Import Modules
const express = require('express');

// Import Middlewares
const { authMiddleware } = require('../middlewares/auth.middleware');

// Import Auth Controllers
const { authLoginController } = require('../controllers/auth.controller');

// Import Visitor Controllers
const { visitorRegisterController } = require('../controllers/visitor.controller');

// Define Router
const router = express.Router();

// Define Router Auth Controller
router.post('/auth/login', authLoginController);

// Define Router Visitor Controller
router.post('/visitor/register', authMiddleware, visitorRegisterController);

// Export Router
module.exports = { router };
