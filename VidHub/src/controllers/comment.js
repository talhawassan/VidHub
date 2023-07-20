const { createError } = require('../error')
const Comment = require('../models/comment')
const Video = require('../models/video')

exports.addComment = async (req, res, next) => {
    try {
        const newComment = new Comment({ ...req.body, userId: req.user.id })
        const savedComment = await newComment.save()
        res.status(200).json({
            status: true,
            message: 'commented successfully!',
            savedComment
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: true,
                message: "Comment hhas been deleted"
            })
        } else {
            return next(createError(403, "Unauthorized access you dont have access to this opertaion"))
        }
    } catch (error) {
        next(error)
    }
}

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json({
            status: true,
            message: 'success',
            comments
        })
    } catch (error) {
        next(error)
    }
}