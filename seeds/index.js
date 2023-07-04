const mongoose = require('mongoose');
// mongoose model
const Campground = require('../models/campground')
// seed data
const cities = require('./cities');
const { descriptors, places} = require('./seedHelpers');

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

const Sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${Sample(descriptors)} ${Sample(places)}`,
            price: price,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sint rerum cupiditate. Labore vel praesentium magni ab velit sit illo aut officiis blanditiis perferendis, ex cumque, dolorem cupiditate, officia provident.",
            imageUrl: "https://source.unsplash.com/collection/623746"
        })
        await camp.save()
    }
    
}

seedDB().then(() => {
    mongoose.connection.close();
});


