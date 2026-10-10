const express = require('express');
const router = express.Router();

const superAdminController = require('../controllers/superAdminController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

// Import middleware ONCE
const {
    requireAuth,
    requireAdmin,
    requireSuperAdmin
} = require('../middleware/auth');

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

// Forgot and reset password
router.get('/forgot-password', authController.showForgotPassword);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:token', authController.showResetPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Admin routes
router.get('/admin/dashboard', requireAdmin, adminController.dashboard);
router.post('/admin/menu', requireAdmin, adminController.addMenuItem);

// Superadmin routes
router.get('/superadmin/dashboard', requireSuperAdmin, superAdminController.dashboard);
router.post('/superadmin/restaurants', requireSuperAdmin, superAdminController.addRestaurant);
router.post('/superadmin/restaurants/:id/remove', requireSuperAdmin, superAdminController.removeRestaurant);
router.post('/superadmin/grant-admin', requireSuperAdmin, superAdminController.grantAdmin);

module.exports = router;