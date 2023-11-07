
const express = require('express')
const router = express.Router() 
const authController = require('../controllers/authController') 

router.post('/register', authController.validate('register'), authController.register)
router.post('/login', authController.validate('login'), authController.login)
router.get('/roles', authController.getRoles)


module.exports = router 