const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review')

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
    imageUrl: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


// delete reviews with its campgrounds middleware
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);