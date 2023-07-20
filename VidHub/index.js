const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config({path: './.env'})

const app = express()

app.use(cookieParser())
app.use(express.json())

const routes = {
    authRoute: require('./src/routes/auth'),
    userRoute: require('./src/routes/user'),
    videoRoute: require('./src/routes/video'),
    commentRoute: require('./src/routes/user')
}

app.use('/api/auth', routes.authRoute)
app.use('/api/users', routes.userRoute)
app.use('/api/videos', routes.videoRoute)
app.use('/api/comments', routes.commentRoute)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    res.setHeader('Content-Type', 'application/json');
    return res.status(status).json({
      success: false,
      status,
      message
    });
  });

const connect = () => {
    mongoose.connect(process.env.MONGO2).then(() => {
        console.log('connected to DB')
    }).catch((err) => {
        throw err
    })
}

app.listen(process.env.PORT, () => {
    connect()
    console.log('server is up on port')
})