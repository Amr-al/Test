const router = require('express').Router()
const { createChat, allChats, getChat } = require('../controller/chatController')
const check = require('../guard/validation')
router.post('/createchat' , check.isLogin , createChat)
router.get('/allchats' , check.isLogin , allChats)
router.get('/getchat' , check.isLogin,getChat)
module.exports = router;
