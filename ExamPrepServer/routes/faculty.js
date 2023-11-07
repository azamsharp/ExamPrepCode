
const express = require('express')
const router = express.Router() 
const facultyController = require('../controllers/facultyController') 

router.get('/courses',facultyController.getCoursesForFaculty) 
router.post('/courses', facultyController.validate("createCourse"), facultyController.createCourse)

module.exports = router 