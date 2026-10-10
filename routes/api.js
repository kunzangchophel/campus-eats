const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

// Make the logged-in user available to every view, without passing it manually every time
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


router.get('/restaurants', apiController.getRestaurants);
router.get('/restaurants/:id/menu', apiController.getRestaurantMenu);
router.get('/orders/:id', apiController.getOrder);
router.post('/orders', apiController.createOrder);
router.get('/stats', apiController.getStats);

module.exports = router;

const apiRoutes = require('./routes/api');

const { requireAuthApi } = require('../middleware/auth');

router.post('/orders', requireAuthApi, apiController.createOrder);

app.use('/api', apiRoutes);

