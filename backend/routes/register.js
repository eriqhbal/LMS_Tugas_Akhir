const express = require("express");
const router = express.Router();

// Controller
const signUpController = require("../Controllers/signUpController");

router
  .route("/")
  .get()
  .post(signUpController);

module.exports = router;
