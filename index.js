const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const blogRouter = require('./controller/blog')
app.use('/api/blogs', blogRouter)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})