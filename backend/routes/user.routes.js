const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controllers');
const { authUser } = require('../middlewares/auth.middleware');

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 5 }).withMessage('First name must be at least 5 characters long'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
  ],
  userController.registerUser
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
  ],
  userController.loginUser
);

// Profile route
router.get('/profile', authUser, userController.getUserProfile);

// Logout route
router.post('/logout', authUser, userController.logoutUser);

module.exports = router;
