const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [5, 'first name must be at least 5 characters long'],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [5, 'last name must be at least 5 characters long'],
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, 'email must be at least 8 characters long'],
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'password must be at least 3 characters long'],
  },
  socketId: {
    type: String,
    required: false,   // ✅ no longer required
    default: null      // ✅ defaults to null at registration
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehical: {
    color: {
      type: String,
      required: true,
    },
    vehicalType: {
      type: String,
      required: true,
      enum: ['car', 'auto', 'bike'],  // ✅ match your route validation
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1 person'],
      max: [6, 'Capacity must be at most 6 people'],
    }
  },
  location: {
    lat: Number,
    lng: Number
  }
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
