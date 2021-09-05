module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
    "jest/globals": true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "cypress", "react", "jest"],
  rules: {
    "prettier/prettier": "error",
  },
};
