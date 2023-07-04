const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
    imageUrl: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);