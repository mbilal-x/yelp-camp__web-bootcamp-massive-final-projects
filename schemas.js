 const Joi = require('joi');
 
module.exports.campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            imageUrl: Joi.string().required(),
            location: Joi.string().required(),
            price: Joi.number().required().min(0)
        }).required()
    })


module.exports.reviewSchema = Joi.object({
        review: Joi.object({
            body: Joi.string().required(),
            rating: Joi.number().required().min(0).max(5)
        }).required()
    })

