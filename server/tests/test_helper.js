const bcrypt = require("bcryptjs");
const Blog = require("../models/blog");
const User = require("../models/user");

const blogs = [
  {
    title: "First try",
    author: "Angelxv01",
    url: "fake_url",
    likes: 0,
  },
  {
    title: "Second try",
    author: "Angelxv01",
    url: "fake_url",
    likes: 0,
  },
];

const blogsInDb = async () => {
  const findResult = await Blog.find({});
  return findResult.map((blog) => blog.toJSON());
};

const findBlogById = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const findUserById = async () => {
  const users = await User.find({});
  return users;
};

const createUser = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
};

module.exports = {
  blogsInDb,
  findBlogById,
  usersInDb,
  findUserById,
  blogs,
  createUser,
};
