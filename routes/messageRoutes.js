const router = require('express').Router()
const { sendMessage,  allMessages,updateLast} = require('../controller/messageController')
const check = require('../guard/validation')
router.get('/allmessages' , check.isLogin , allMessages)
router.post('/updatelast' , check.isLogin ,updateLast )
router.post('/sendmessage', check.isLogin, sendMessage)
module.exports = router;