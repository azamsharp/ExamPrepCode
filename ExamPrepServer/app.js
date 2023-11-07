const express = require('express')
const app = express() 
const cors = require('cors')
const indexRouter = require('./routes/index') 
const facultyRouter = require('./routes/faculty')
const studentRouter = require('./routes/student')
const courseRouter = require('./routes/course')
const { authenticate } = require('./middlewares/authMiddleware')

app.use(cors())
app.use(express.json())

app.use('/api', indexRouter)
app.use('/api/faculty', authenticate, facultyRouter)
app.use('/api/students', authenticate, studentRouter)
app.use('/api/courses', courseRouter)

app.listen(8080, () => {
    console.log('Server is running...')
})