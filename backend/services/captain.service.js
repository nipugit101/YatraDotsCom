const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehicalType, plate, color, capacity
}) => {
    if(!firstname || !email || !password || !vehicleType || !plate || !color || !capacity) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            vehicleType,
            plate,
            color,
            capacity
        }
    });
    return captain;
}