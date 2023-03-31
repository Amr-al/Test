const router = require('express').Router()
const { signUp } = require('../controller/authController')
router.post('/signup'  ,  signUp)
module.exports = router;
