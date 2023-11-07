const express = require('express')
const router = express.Router() 
const courseController = require('../controllers/courseController') 

router.get('/', courseController.availableCourses)
router.get('/:userId', courseController.coursesByUserId)

module.exports = router 