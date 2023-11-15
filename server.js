require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const corsWhiteList = ['https://mern-frontend-umber.vercel.app/api/workouts','https://mern-frontend-umber.vercel.app/']
const corsOptions = (req, callback) => {
    if (corsWhiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

// initialize express app
const app = express()

//middleware
app.use(express.json())

// enable CORS
//app.use(cors(corsOptions))

app.use( cors(corsOptions), (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route handler
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on http://localhost:' + process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })

    module.exports = app