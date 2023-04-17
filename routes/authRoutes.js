const router = require('express').Router()
const { signUp, signIn, sendRequest, acceptRequest, cancelRequest } = require('../controller/authController')
router.post('/signup'  ,  signUp)
router.post('/signin', signIn)
router.post('/sendrequest', check.isLogin, sendRequest)
router.post('/acceptrequest', check.isLogin, acceptRequest)
router.post('/cancelrequest', check.isLogin, cancelRequest)
module.exports = router;
