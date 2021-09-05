const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginRouter = require("express").Router();
const { SECRET } = require("../../config");

const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { body } = req;

  const user = await User.findOne({ username: body.username });

  const correctPassword =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && correctPassword)) {
    return res.status(401).json({
      error: "Invalid user or password",
    });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
