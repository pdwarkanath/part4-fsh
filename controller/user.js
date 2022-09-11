const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')


userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {'title': 1, 'author': 1, 'url': 1, 'likes': 1 })
    response.status(200).json(users)
  })

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs')
  user ? response.status(200).json(user) : response.status(404).end()
})

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

userRouter.patch('/:id', async (request, response) => {
  const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body)
  updatedUser ? response.status(201).json(updatedUser) : response.status(400).end()
})
  
  
userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    response.status(400).json({ error: 'username and password are required' })
  } else if (username.length < 3 || password.length < 3) {
    response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

module.exports = userRouter