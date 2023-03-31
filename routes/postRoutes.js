const router = require('express').Router()
const { createPost } = require('../controller/postController')
const upload = require('../utilies/multer')
const check = require('../guard/validation')
router.post('/create', upload.Multer.single('post') , createPost)
router.get('/posts',  check.isLogin , getPost)
module.exports = router;
