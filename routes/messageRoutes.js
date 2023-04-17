const router = require('express').Router()
const { sendMessage,  } = require('../controller/messageController')
const check = require('../guard/validation')

router.post('/sendmessage', check.isLogin, sendMessage)
module.exports = router;