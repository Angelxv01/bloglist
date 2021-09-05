require("dotenv").config();

const MONGODB_API =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB_API
    : process.env.MONGODB_API_TEST;
const { PORT } = process.env;
const { SECRET } = process.env;

module.exports = { MONGODB_API, PORT, SECRET };
