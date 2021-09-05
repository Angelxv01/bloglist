const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const { SECRET } = require("../../config");

const Blog = require("../models/blog");
const User = require("../models/user");

const userExtractor = async (req, res, next) => {
  const { token } = req;
  const decodedToken = jwt.verify(token, SECRET);
  if (!(token || decodedToken)) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  req.user = user;
  return next();
};

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    blogs: 0,
  });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate("user", {
    blogs: 0,
  });
  res.json(updatedBlog.toJSON());
});

blogsRouter.post("/:id/comment", async (req, res) => {
  const { body } = req;

  if (!body.comment) {
    return res.status(400).json({ error: "missing content" });
  }

  const blog = await Blog.findById(req.params.id).populate("user", {
    blogs: 0,
  });
  blog.comments = blog.comments.concat(body.comment);
  await blog.save();

  return res.json(blog.toJSON());
});

blogsRouter.use(userExtractor);

blogsRouter.post("/", async (req, res) => {
  const { body } = req;
  const { user } = req;

  if (!(body.title && body.url)) {
    return res.status(400).json({ error: "Missing content" }).end();
  }

  const blog = new Blog(body);

  if (!body.likes) {
    blog.likes = 0;
  }
  blog.user = user;

  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return res.status(201).json(result.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  let blogId = req.params.id;
  const { user } = req;
  const blog = await Blog.findById(blogId);

  if (user.id.toString() !== blog.user.toString()) {
    return res.status(401).json({
      error: "only creator can delete blog",
    });
  }

  await blog.remove();
  blogId = blog.id.toString();

  user.blogs = user.blogs.filter((obj) => obj.toString() === blogId);
  await user.save();
  return res.status(204).end();
});

module.exports = blogsRouter;
