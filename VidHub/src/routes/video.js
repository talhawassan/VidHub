const express = require('express')
const router = express.Router()
const { addVideo, updateVideo, deleteVideo, getVideo, addView
    , randomVideos, trendingVideos, subscribe , getByTag, search} = require('../controllers/video')
const { verifyToken } = require('../verifyToken')


router.post('/add', verifyToken, addVideo)
router.put('/update/:id', verifyToken, updateVideo)
router.delete('/delete/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.get('/view/:id', addView)
router.get('/trend', trendingVideos)
router.get('/random', randomVideos)
router.get('/sub', verifyToken,subscribe)
router.get('/tags', getByTag)
router.get('/search', search)

module.exports = router