require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_API } = require("./config");

const app = express();

const blogsRouter = require("./server/controllers/blogs");
const usersRouter = require("./server/controllers/users");
const loginRouter = require("./server/controllers/login");

const middleware = require("./server/utils/middleware");
const logger = require("./server/utils/logger");

mongoose
  .connect(MONGODB_API, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.Info("Connected to DB"))
  .catch((err) => logger.Error(err));

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/health", (_req, res) => res.send("ok"));
app.use("/version", (_req, res) => res.send("0.0.0-v10"));
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  // eslint-disable-next-line global-require
  const testingRouter = require("./server/controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
