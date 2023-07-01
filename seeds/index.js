const mongoose = require('mongoose');
const Campground = require('../models/campground')

// const cities = require('./cities');
// const seedHelpers = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp' , {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', ()=>{
    console.log("Database Connected!!!")
})

const seedDB = async () => {
    await Campground.deleteMany({});
    // seeding code goes here
    await c.save()
}

seedDB();


