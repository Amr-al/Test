const router = require('express').Router()
const { createPost, getPost, addComment } = require('../controller/postController')
const upload = require('../utilies/multer')
const check = require('../guard/validation')
router.post('/create', check.isLogin, upload.Multer.single('post') , createPost)
router.get('/posts', check.isLogin, getPost)
router.post('/addcomment', check.isLogin, addComment)
module.exports = router;
