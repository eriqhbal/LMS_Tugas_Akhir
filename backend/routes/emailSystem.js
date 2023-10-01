const express = require("express");
const  emailToSendPassword  = require("../Controllers/emailController");
const Routes = express.Router();

Routes.route("/")
  .get(() => {})
  .post(emailToSendPassword);

module.exports = Routes;
