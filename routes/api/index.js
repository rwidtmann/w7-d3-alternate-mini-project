const router = require('express').Router();
const dealershipRoutes = require('./dealershipRoutes');
const carRoutes = require('./carRoutes');

// /api/dealerships
router.use('/dealerships', dealershipRoutes);
router.use('/cars', carRoutes);

module.exports = router;
