const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controllers');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:5}).withMessage('First name must be at least 5 characters long'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long'),
    body('vehical.vehicalType').isInt(['car','auto','bike']).withMessage('Vehical type must be at least 3 characters long'),
    body('vehical.plate').isLength({min:3}).withMessage('Vehical plate number must be at least 3 characters long'),
    body('vehical.color').isLength({min:3}).withMessage('Vehical color must be at least 3 characters long'),
    body('vehical.capacity').isInt({min:1}).withMessage('Vehical capacity must be at least 1 characters long'),
],
captainController.registerCatain
)


module.exports = router;