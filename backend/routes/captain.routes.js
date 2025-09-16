const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controllers');
const { authCaptain } = require('../middlewares/auth.middleware');

// Register Captain
router.post('/register', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('fullname.firstname').isLength({ min: 5 }).withMessage('First name must be at least 5 characters long'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  body('vehicle.vehicleType').trim().isIn(['car', 'auto', 'bike']).withMessage('vehicle type must be one of: car, auto, or bike'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('vehicle plate number must be at least 3 characters long'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('vehicle color must be at least 3 characters long'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('vehicle capacity must be at least 1')
], captainController.registerCaptain);

// Login Captain
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
], captainController.loginCaptain);

// Get Captain Profile
router.get('/profile', authCaptain, captainController.getCaptainProfile);

// Logout Captain
router.post('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;
