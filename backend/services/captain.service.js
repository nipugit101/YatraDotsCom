const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function createCaptain({ firstname, lastname, email, password, vehicalType, plate, color, capacity }) {
  if (!firstname || !email || !password || !vehicalType || !plate || !color || !capacity) {
    throw new Error('All fields are required');
  }

  const captain = await captainModel.create({
    fullname: { firstname, lastname },
    email,
    password,
    socketId: null,   // ✅ explicitly set to null
    vehical: {
      vehicalType,
      plate,
      color,
      capacity
    }
  });

  return captain;
}

module.exports = {
  hashPassword,
  createCaptain
};
