const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const Campground = require('./models/campground')

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


app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/makecampground', async (req, res)=>{
    const camp = new Campground({
        title: "My Backyard"
    })
    await camp.save()
    res.send(camp)
})

app.listen(5000 , ()=>{
    console.log("SERVER LISTENING ON PORT 5000")
})
