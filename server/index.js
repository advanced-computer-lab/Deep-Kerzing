if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Flight = require('./models/flight');
const dbUrl = process.env.DB_URL ;



const app = express();


mongoose.connect(dbUrl, {
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));

app.get('/',async(req,res)=>{
    const l=await Flight.find({})
    res.json(l)

})

app.listen(8000, () => {
    console.log('Serving on port 8000')

})