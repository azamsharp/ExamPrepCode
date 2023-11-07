
const { body, validationResult } = require('express-validator')
const models = require('../models') 

exports.enroll = async (req, res) => {

    const { courseCode } = req.body 

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors.array().map(error => error.msg).join(' ') })
        return
    }

    // get courseId based on courseCode 
    const course = await models.Course.findOne({
        where: {
            courseCode: courseCode
        }
    })

    if(course) {
        
        // check if the user is already enrolled for the course 
        const enrollment = await models.Enrollment.findOne({
            where: {
                userId: req.userId, 
                courseId: course.id 
            }
        })

        if(enrollment) {
            res.status(400).json({success: false, message: 'User is already enrolled in this course.'}) 
            return 
        }

        const newEnrollment = await models.Enrollment.create({
            userId: req.userId, 
            courseId: course.id, 
            enrollmentDate: new Date() 
        })

        const enrollmentWithCourse = await models.Enrollment.findByPk(newEnrollment.id, {
            include: [
                {
                    model: models.Course, 
                    as: 'course' 
                }
            ]
        }) 

        res.status(200).json({success: true, enrollment: { id: enrollmentWithCourse.id, course: enrollmentWithCourse.course, enrollmentDate: enrollmentWithCourse.enrollmentDate }})

    } else {
        res.status(400).json({success: false, message: 'Course not found.'})
    }

}

exports.validate = (method) => {
    switch (method) {
        case "enroll": {
            return [
                body('courseCode', 'Course code is required').exists().isLength({ min: 4 })
            ]
        }

    }
}