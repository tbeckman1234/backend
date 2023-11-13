require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// initialize express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mern-backend-tau.vercel.app/api/")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    res.header("Vary", "Accept-Encoding, Origin")
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