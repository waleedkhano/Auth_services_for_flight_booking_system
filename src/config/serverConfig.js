const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  JWT_KEY: process.env.JWT_KEY,
  SALT: 10,
};
