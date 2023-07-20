const { createError } = require('../error')
const User = require('../models/user')

exports.updateUser = async (req, res, next) => {
    try {
        if (req.params.id === req.user.id) {
            const update = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            res.status(200).json(update)
        } else {
            next(createError(403, "you are not authorized to this account"))
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        if (req.params.id === req.user.id) {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "user deleted successfully" })
        } else {
            next(createError(403, "you are not authorized to this account"))
        }
    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.status(200).json({
                status: true,
                message: 'user found successfully',
                user
            })
        }

    } catch (error) {
        next(error)
    }
}

exports.subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json({
            status: true,
            message: "Subscription successfull."
        })
    } catch (error) {
        next(error)
    }
}

exports.unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json({
            status: true,
            message: "Unsubscription successfull."
        })
    } catch (error) {
        next(error)
    }
}

exports.likeVideo = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

exports.disLikeVideo = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}