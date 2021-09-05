// const logger = require('../utils/logger')
const _ = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (acc, blog) => (blog.likes > acc.likes ? blog : acc),
    { likes: 0 }
  );

  return (({ title, author, likes }) => ({
    title,
    author,
    likes,
  }))(favorite);
};

const mostBlogs = (blogs) => {
  const mostBlogger = _.countBy(blogs, (obj) => obj.author);
  const keys = Object.keys(mostBlogger);

  return keys.reduce(
    (acc, key) =>
      mostBlogger[key] > acc.blogs
        ? { author: key, blogs: mostBlogger[key] }
        : acc,
    { blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, (blog) => blog.author);

  const keys = Object.keys(authors);
  return keys.reduce(
    (max, key) => {
      const likes = _.sumBy(authors[key], (obj) => obj.likes);
      return likes > max.likes ? { author: key, likes } : max;
    },
    { likes: 0 }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
