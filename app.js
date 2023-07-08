const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const Joi = require('joi');

const { campgroundSchema } = require('./schemas')
const Campground = require('./models/campground')
const campground = require('./models/campground')
const catchAync = require("./utils/catchAsync")
const AppError = require("./utils/AppError")
const catchAsync = require('./utils/catchAsync')


// express app 
const app = express()
// mongo connection
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

// middleware
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);


const validateCampgrounds = (req, res, next) => {
    // joi validation
    const { error } = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)
        throw new AppError(msg , 400)
    }
    else{
        next()
    }
}


app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/campgrounds', catchAsync(async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))

app.get('/campgrounds/new', catchAsync(async (req, res)=>{
    res.render('campgrounds/new', {campground})
}))

app.post('/campgrounds',validateCampgrounds , catchAsync(async (req, res) => {

    const camp = new Campground(req.body.campground)
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}))

app.put('/campgrounds/:id',validateCampgrounds , catchAsync(async (req, res) => {
    if(!req.body.campground) throw AppError('Invalid Data!!!', 400)
    const camp = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground  })
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    res.redirect(`/campgrounds`)
}))

app.get('/campgrounds/:id', catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id)
    // res.send(campground)
    res.render('campgrounds/show', {campground})
}))

app.all('*', (req, res, next) => {
    res.render('pageNotFound')
})
 
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = "Default Error Message!!!";
    res.status(status)
    res.render('errorAlert', {err})
})

app.listen(5000 , ()=>{  
    console.log("SERVER LISTENING ON PORT 5000")
})
