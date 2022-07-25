const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.status(200).json(blog) : response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.patch('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  updatedBlog ? response.status(201).json(updatedBlog) : response.status(400).end()
})
  
  
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const validation = blog.validateSync()
  if (validation) { 
    response.status(400).send()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

module.exports = blogRouter