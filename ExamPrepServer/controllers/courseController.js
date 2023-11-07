
const models = require('../models')

exports.availableCourses = async (req, res) => {
    const courses = await models.Course.findAll({})
    res.json(courses)
}

exports.coursesByUserId = async (req, res) => {
    
    const userId = parseInt(req.params.userId)
    console.log(userId)

    const courses = await models.Course.findAll({
        where: {
            userId: userId
        }
    })
    
    res.json(courses)
}

