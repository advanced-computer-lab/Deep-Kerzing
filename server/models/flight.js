const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const FlightSchema = new Schema({
    
    from: {
        type: String,
        required: true,        
    },
    to : {
        type: String,
        required: true,
    },
    departureDate :{
        type:String,
        required: true
    },
    arrivalDate:{
        type:String,
        required: true
    },
    departureTime :{
        type:String,
        required: true
    },
    arrivalTime :{
        type:String,
        required: true
    },
    economySeats :{
        type:String,
        required: true
    },
    economyPrice :{
        type:Number,
        required: true
    },
    firstClassSeats:{
        type:String,
        required: true
    },
    firstClassPrice :{
        type:Number,
        required: true
    },
    businessSeats:{
        type:String,
        required: true
    },
    businessPrice :{
        type:Number,
        required: true
    },
    flightNumber:{
        type:String,
        required:true
    }

});




module.exports = mongoose.model('Flight', FlightSchema);