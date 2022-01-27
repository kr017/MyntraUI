require("dotenv").config();

module.exports = {
  API_URL: process.env.REACT_APP_API_URL,

  STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
  RZP_KEY: process.env.REACT_APP_RZP_KEY,
};
