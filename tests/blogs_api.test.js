const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is present in all', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('New blog is posted', async () => {
  const newBlog = {
    title: "New Blog",
    author: "Dk Prabhu",
    url: "https://dkprabhu.com/newblog",
    likes: 7
  }
  await api.post('/api/blogs').send(newBlog).expect(201)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('New blog without title or url is not created', async () => {
  const newBlog = {
    author: "Dk Prabhu",
    url: "https://dkprabhu.com/newblog",
    likes: 7
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('Likes defaults to 0', async () => {
  for (const initialBlog of helper.initialBlogs){
    const response = await api.get(`/api/blogs/${initialBlog._id}`)
    if (initialBlog.hasOwnProperty('likes')) {
      expect(response.body.likes).toBe(initialBlog.likes)
    } else {
      expect(response.body.likes).toBe(0)
    }
  }
})

test('blog is deleted', async () => {
  const id = helper.initialBlogs[0]._id
  await api.delete(`/api/blogs/${id}`).expect(204)
  const response = await api.get(`/api/blogs/${id}`).expect(404)
})


afterAll(() => {
  mongoose.connection.close()
})