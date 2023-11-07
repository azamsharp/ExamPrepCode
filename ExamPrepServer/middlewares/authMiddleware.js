
const jwt = require('jsonwebtoken')
const models = require('../models') 
require('dotenv').config() 

// authenticate middleware 
exports.authenticate = async (req, res, next) => {

    const authHeader = req.headers['authorization']
    if(authHeader) {
        // get the token out of the header 
        const token = authHeader.split(' ')[1]
        console.log(token)
        if(token) {
            // decode the token 
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
                const user = await models.User.findByPk(decodedToken.userId)
                if(!user) {
                    res.status(401).json({success: false, message: 'User not found'})
                }
                // store the userId in the request
                req.userId = user.id 
                next() 
            } catch(error) {
                if(error instanceof jwt.JsonWebTokenError) {
                    res.status(401).json({success: false, message: 'Token expired'})
                } else {
                    res.status(500).json({success: false, message: 'Internal server error'})
                }
            }
        } else {
            res.status(401).json({success: false, message: 'Bearer token is missing'})
        }

    } else {
        res.status(401).json({success: false, message: 'Required headers are missing'})
    }
}

