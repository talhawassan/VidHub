const { createError } = require('../error')
const Video = require('../models/video')
const User = require('../models/user')

exports.addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json({
            status: true,
            message: "success",
            savedVideo
        })
    } catch (error) {
        next(error)
    }
}

exports.test = async (req, res, next) => {
    try {
        res.status(200).json({
            status: true,
            message: "test success"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.userId) {
            const updateVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            res.status(200)
                .json({
                    status: true,
                    message: "Video update successfully",
                    updateVideo
                })
        } else {
            next(createError(403, "you are not authorized to this account"))
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(
                req.params.id,
            );
            res.status(200)
                .json({
                    status: true,
                    message: "Video deleted successfully",
                    updateVideo
                })
        } else {
            next(createError(403, "you are not authorized to this account"))
        }
    } catch (error) {
        next(error)
    }
}

exports.getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (video) {
            res.status(200).json({
                status: true,
                message: 'video found successfully',
                video
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json({
            status: true,
            message: 'View has been increased'
        })
    } catch (error) {
        next(error)
    }
}


exports.randomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json({
            status: true,
            videos
        })
    } catch (error) {
        next(error)
    }
}

exports.trendingVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json({
            status: true,
            videos
        })
    } catch (error) {
        next(error)
    }
}

exports.subscribe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId })
            })
        );
        const List = list.flat().sort((a, b) => b.createdAt - a.createdAt)
        res.status(200).json({
            status: true,
            message: "success",
            List
        })

    } catch (error) {
        next(error)
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const tags = req.query.tags.split(",")
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json({
            status: true,
            videos
        })
    } catch (error) {
        next(error)
    }
}

exports.search = async (req, res, next) => {
    try {
        const query = req.query.q
        const videos = await Video.find({
            title: { $regex: query, $options: "i" }
        }).limit(40);
        res.status(200).json({
            status: true,
            videos
        })
    } catch (error) {
        next(error)
    }
}