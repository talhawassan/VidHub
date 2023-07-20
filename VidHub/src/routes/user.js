const express = require('express')
const {
    updateUser,
    deleteUser,
    getUser,
    subscribe,
    unsubscribe,
    likeVideo,
    disLikeVideo
} = require('../controllers/user')

const { verifyToken } = require('../verifyToken')

const router = express.Router()

//Update USER
router.put('/update/:id', verifyToken ,updateUser)

//DELETE USER
router.delete('/delete/:id', verifyToken ,deleteUser)

//GET A USER
router.get('/find/:id', getUser)

//SUBSCRIBE A USER
router.put('/sub/:id', verifyToken ,subscribe)

//UNSUBSCRIBE A USER
router.put('/unsub/:id', verifyToken ,unsubscribe)

//LIKE A VIDEO
router.put('/like/videoId', verifyToken ,likeVideo)

//DISLIKE A VIDEO
router.put('/dislike/:videoId', verifyToken ,disLikeVideo)

module.exports = router