const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.Info("Method:", req.method);
  logger.Info("Path:  ", req.path);
  logger.Info("Body:  ", req.body);
  logger.Info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.Error(err.message);
  switch (err.name) {
    case "CastError":
      return res.status(400).send({ error: "malformed id" });
    case "ValidationError":
      return res.status(400).json({ error: err.message });
    case "JsonWebTokenError":
      return res.status(401).json({ error: "invalid token" });
    case "TokenExpiredError":
      return res.status(401).json({ error: "token expired" });
    default:
      return next(err);
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substr(7);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
