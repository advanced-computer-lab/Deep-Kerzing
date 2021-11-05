if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: '../.env' });
}
const mongoose = require('mongoose');

const Flight = require('../models/flight');
const Airport = require('../models/airport');
const helper = require("./flights.js");


const dbUrl = process.env.DB_URL ;


mongoose.connect(dbUrl,
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await Flight.deleteMany({});
    for (let i = 0; i < helper.length ; i++) {
        const flight = new Flight({
            from:helper[i].from,
            to: helper[i].to,
            departureDate :helper[i].departureDate,
            arrivalDate:helper[i].arrivalDate,
            departureTime :helper[i].departureTime,
            arrivalTime :helper[i].arrivalTime,
            economySeats :helper[i].economySeats,
            economyPrice :helper[i].economyPrice,
            firstClassSeats:helper[i].firstClassSeats,
            firstClassPrice :helper[i].firstClassPrice,
            businessSeats:helper[i].businessSeats,
            businessPrice :helper[i].businessPrice,
            flightNumber :helper[i].flightNumber
        })
        await flight.save();
    }

    await Airport.deleteMany({})
    ;
    for (let i = 0; i < helper.length ; i++) {
        try{
            const airport = new Airport({
                name:helper[i].from,
            })
            await airport.save();
        }
        catch(e){
            console.log("Value is Skipped")
        }
        try{
            const airport1 = new Airport({
                name:helper[i].to,
            })
            await airport1.save();
        }
        catch(e){
            console.log("Value is Skipped")
        }


    }
}


seedDB().then(() => {
    mongoose.connection.close();
})