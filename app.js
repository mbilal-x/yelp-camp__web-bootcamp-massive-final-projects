const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const Campground = require('./models/campground')
const campground = require('./models/campground')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

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


app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/campgrounds', async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/new', async (req, res)=>{
    res.render('campgrounds/new', {campground})
})

app.post('/campgrounds', async (req, res) => {
    const camp = new Campground(req.body.campground)
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})

app.get('/campgrounds/:id/edit', async (req, res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async (req, res) => {
    const camp = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground  })
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})

app.delete('/campgrounds/:id', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    res.redirect(`/campgrounds`)
})

app.get('/campgrounds/:id', async (req, res)=>{
    const campground = await Campground.findById(req.params.id)
    // res.send(campground)
    res.render('campgrounds/show', {campground})
})
 
app.listen(5000 , ()=>{  
    console.log("SERVER LISTENING ON PORT 5000")
})
