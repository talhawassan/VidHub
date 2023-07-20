const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { createError } = require('../error');

exports.userSignUp = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash})
        await newUser.save()
        if (newUser) {
            res.status(200).json({
                status: true,
                message: 'signed up successfully',
                newUser
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.userSignIn = async (req, res, next) => {
    try {
      const user = await User.findOne({name: req.body.name})
      if(!user) return next(createError(404, "User not found"))

      const isCorrect = await bcrypt.compare(req.body.password, user.password)
      if(!isCorrect) return next(createError(400, "Wrong Credentials"))

      const token = jwt.sign({id:user._id}, process.env.JWT_KEY)
      const {password, ...others} = user._doc

      res.cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json(others)
    } catch (error) {
        next(error)
    }
}