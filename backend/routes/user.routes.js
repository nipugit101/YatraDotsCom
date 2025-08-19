
//user.routers.js
const express= require('express');
const router = express.Router();
const { body } =require('express-validator');
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:5}).withMessage('First name must be at least 5 characters long'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long')
], userController.loginUser);

router.get('/profile',authMiddleware, userController.getUserProfile);

router.post('/logout',authMiddleware, userController.logoutUser);



module.exports = router;