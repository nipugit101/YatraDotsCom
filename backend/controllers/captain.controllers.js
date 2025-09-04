const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCatain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehical } = req.body;

  const isCaptainAlreadyExists = await captainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res.status(400).json({ message: 'Captain already exists' });
  }

  const hashedPassword = await captainService.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    vehicalType: vehical.vehicalType,
    plate: vehical.plate,
    color: vehical.color,
    capacity: vehical.capacity
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ captain, token });
};
