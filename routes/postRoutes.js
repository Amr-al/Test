const router = require('express').Router()
const { createPost } = require('../controller/postController')
const upload = require('../utilies/multer')
router.post('/create'  ,upload.Multer.single('post')  createPost)
module.exports = router;
