const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {'name': 1})
    response.status(200).json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {'name': 1})
  blog ? response.status(200).json(blog) : response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.equals(user._id)) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid user' });
  }
})

blogRouter.patch('/:id', async (request, response) => {
  const user = request.user
  if (user) {
    const blog = await Blog.findById(request.params.id)
    if (blog.user.equals(user._id)) {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
      updatedBlog ? response.status(201).json(updatedBlog) : response.status(400).end()
    } else {
      response.status(401).json({ error: 'invalid user' });
    }
  } else {
    response.status(400).send()
  }
})
  
  
blogRouter.post('/', async (request, response) => {
  const user = request.user
  if (user) {
    const blog = new Blog(request.body)
    blog.user = user._id
    const validation = blog.validateSync()
    if (validation) { 
      response.status(400).send()
    } else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }
  } else {
    response.status(400).send()
  }
})

module.exports = blogRouter