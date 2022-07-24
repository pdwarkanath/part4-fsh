const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('all tests', () => {
  const blogs = helper.initialBlogs

  test('total likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
  test('favorite blog', () => {
    expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
    
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expectedResult)
  })

  test('most blogs', () => {
    expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    }
    
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expectedResult)
  })

  test('most likes', () => {
    expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    
    const result = listHelper.mostLikes(blogs)
    console.log(result)
    expect(result).toEqual(expectedResult)
  })

})