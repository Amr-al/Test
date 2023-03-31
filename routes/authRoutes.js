const router = require('express').Router()
const { signUp,signIn } = require('../controller/authController')
router.post('/signup'  ,  signUp)
router.post('/signin', signIn)
module.exports = router;
