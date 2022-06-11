const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const blogRouter = require('./controller/blog')
app.use('/api/blogs', blogRouter)

module.exports = app