const express = require('express')
const router = express.Router()

const { userSignUp, userSignIn} = require('../controllers/auth')

//CREATE USER
router.post('/signup', userSignUp)

//SIGN IN
router.post('/signin', userSignIn)

//SIGN IN WITH GOOGLE
router.post('/google', )

module.exports = router