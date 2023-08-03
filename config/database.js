require("dotenv").config();

module.exports = {
  development: {
    username: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_NAME,
    port: process.env.REACT_APP_DB_PORT,
    host: process.env.REACT_APP_DB_HOST,
    dialect: process.env.REACT_APP_DB_DIALECT,
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+08:00",
  },
};
