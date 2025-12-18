const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  SALT: 10,
};
