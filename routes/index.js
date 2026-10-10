const express = require('express');
const router = express.Router();

const superAdminController = require('../controllers/superAdminController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');
const feedbackController = require('../controllers/feedbackController');

const {
    requireAuth,
    requireAdmin,
    requireSuperAdmin
} = require('../middleware/auth');

const { connectMongo } = require('../config/mongo');

// Email verification
router.get('/verify/:token', authController.verifyEmail);

// Orders
router.post('/orders', requireAuth, orderController.createOrder);
router.get('/orders/:id', orderController.getOrder);
router.post('/orders/:id/update', orderController.updateOrder);
router.post('/orders/:id/cancel', orderController.cancelOrder);

// Restaurant menu
router.get('/restaurants/:id/menu', menuController.getMenuByRestaurant);

// Home and About
router.get('/', homeController.getHome);
router.get('/about', aboutController.getAbout);

// Authentication
router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;