const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassengerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please Add a name"],
    },
    lastName: {
        type: String,
        required: [true, "Please Add a name"],
    },
    passport: {
        type: String,
        required: [true, "Please Add Passport Number"],
}



});




module.exports = mongoose.model('Passenger', FlightSchema);