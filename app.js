const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
app.use(cors())
app.use(express.json())
const loginRouter = require('./controller/login')
const blogRouter = require('./controller/blog')
const userRouter = require('./controller/user')
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogRouter)

module.exports = app