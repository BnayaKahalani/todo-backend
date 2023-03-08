const express = require('express')
const { loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()


router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/user-settings',)


module.exports = router