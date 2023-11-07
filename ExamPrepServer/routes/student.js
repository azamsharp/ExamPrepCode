

const express = require('express')
const router = express.Router() 
const studentController = require('../controllers/studentController') 

// api/students/courses/enroll
router.post('/courses/enroll', studentController.validate('enroll'), studentController.enroll)

module.exports = router 