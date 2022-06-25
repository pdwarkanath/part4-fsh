const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)


const favoriteBlog = (blogs) => {
        const favoriteBlog = blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev)
        delete favoriteBlog._id
        delete favoriteBlog.__v
        delete favoriteBlog.url
        return favoriteBlog
    }


module.exports = {
    dummy, totalLikes, favoriteBlog
}
