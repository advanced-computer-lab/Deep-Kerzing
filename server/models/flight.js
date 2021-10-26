const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const FlightSchema = new Schema({
    from: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.length === 3
            },
            message: val => `${val.value} Invalid Input`
        }        
    },
    to : {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.length === 3
            },
            message: val => `${val.value} Invalid Input`
        }    
    },
    flightDate:{
        type:String,
        required: true
    },
    cabin:{
        type:String,
        required: true,
        enum: ['Business','Economy','First'],
    },
    seatsAvailable:{
        type:Number,
        required: true,        
    }
});

FlightSchema.pre('save', function (next) {
  this.from=this.from.toUpperCase()
  this.to=this.to.toUpperCase()
  next();
});


module.exports = mongoose.model('Flight', FlightSchema);