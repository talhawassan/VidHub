const express = require('express')
const { addComment, deleteComment, getAllComments } = require('../controllers/comment')
const router = express.Router()
const { verifyToken } = require('../verifyToken')

router.post('/add', verifyToken, addComment)
router.delete('/delete:id', verifyToken, deleteComment)
router.get('/get/:videoId', getAllComments)

module.exports = router