/* eslint-disable no-console */
const Info = (...params) => {
  console.log(...params);
};

const Error = (...params) => {
  console.error(...params);
};

module.exports = {
  Info,
  Error,
};
