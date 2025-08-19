const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength:[5,'first name must be at least 5 characters long'],
            unique:true,
        },
        lastname:{
            type: String,
            required: true,
            minlength:[5,'last name must be at least 5 characters long'],
            unique:true,
        }
    },
    email: {
        type: String,
        required: true,
        unique:true,
        minlength:[8,'email must be at least 8 characters long'],
    },
    password: {
        type: String,
        required: true,
        minlength:[3,'password must be at least 3 characters long'],
    },
    socketId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['motorcycle', 'car','bike'],
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
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '1d'});  
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;