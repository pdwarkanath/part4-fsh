const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => blog.likes ? acc + blog.likes : acc, 0)


const favoriteBlog = (blogs) => {
        const favoriteBlog = blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev)
        delete favoriteBlog._id
        delete favoriteBlog.__v
        delete favoriteBlog.url
        return favoriteBlog
    }


const mostBlogs = (blogs) => {
    const authorBlogs = []
    blogs.reduce((prev, current) => {
        if (prev[current.author]) {
            prev[current.author].blogs += 1
        } else {
            prev[current.author] = {author: current.author, blogs: 1}
            authorBlogs.push(prev[current.author])
        }
        return prev
    }, {})
    return authorBlogs.reduce((prev, current) => current.blogs > prev.blogs ? current : prev)
}

const mostLikes = (blogs) => {
    const authorLikes = []
    blogs.reduce((prev, current) => {
        if (prev[current.author]) {
            prev[current.author].likes += current.likes
        } else {
            prev[current.author] = {author: current.author, likes: current.likes}
            authorLikes.push(prev[current.author])
        }
        return prev
    }, {})
    return authorLikes.reduce((prev, current) => current.likes > prev.likes ? current : prev)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
