
const { Op } = require('sequelize')
const models = require('../models')
const { Sequelize } = require('sequelize')

const { body, validationResult } = require('express-validator')

exports.getCoursesForFaculty = async (req, res) => {
    const courses = await models.Course.findAll({
        where: {
            userId: req.userId
        },
        include: [
            {
                model: models.Enrollment, 
                as: 'enrollments', 
                attributes: []
            }
        ], 
        attributes: ['id', 'name', 'description', 'userId', 'courseCode', [
            Sequelize.literal('CAST(COUNT(enrollments.id) AS INTEGER)'),
        'enrollmentCount',
          ]],
        group: ['Course.id'] 
    })

    res.json(courses)
}

const generateClassCode = (existingCodes) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const codeLength = 4;
    let code = '';

    do {
        // Generate a random 4-letter code
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            code += alphabet[randomIndex];
        }
    } while (existingCodes.includes(code));

    return code;
}

// create a course 
exports.createCourse = async (req, res) => {

    const { name, description } = req.body
    const userId = req.userId

    

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors.array().map(error => error.msg).join(' ') })
        return
    }

    // the same instructor cannot make the course with the same name 
    const course = await models.Course.findOne({
        where: {
            name: {
                [Op.iLike]: name
            },
            userId: userId
        }
    })

    if (course) {
        // if the course exists then return an error 
        res.status(400).json({ success: false, message: 'Course name should be unique.' })
        return
    }

    const courses = await models.Course.findAll({})
    const courseCodes = courses.map(course => course.courseCode)
    console.log(courseCodes)
    const uniqueCourseCode = generateClassCode(courseCodes)
    console.log(uniqueCourseCode)


    try {
        // save the course 
        const course = await models.Course.create({
            name: name,
            description: description,
            userId: userId,
            courseCode: uniqueCourseCode
        })

        // 201 for created and send the new user back 
        res.status(201).json({ success: true, course: course })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}



exports.validate = (method) => {
    switch (method) {
        case "createCourse": {
            return [
                body('name', 'Name cannot be empty.').exists().isLength({ min: 2 }),
                body('description', 'Description cannot be empty.').exists().isLength({ min: 2 })
            ]
        }

    }
}