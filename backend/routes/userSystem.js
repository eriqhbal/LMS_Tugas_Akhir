const express = require("express");
const Routes = express.Router();

// Controllers
const {getAllDataStudent, getDetailStudent} = require("../Controllers/studentController");
const  updateDataUser  = require("../Controllers/updateController");

Routes.route("/students")
  .get(getAllDataStudent)
  .post(() => {})
  .patch(() => {})
  .delete(() => {});

Routes.route("/student/:id")
  .get(getDetailStudent)
  .patch(updateDataUser)
  .delete(() => {});

Routes.route("/admin/:id")
  .post(() => {})
  .patch(updateDataUser)
  .delete(() => {});

module.exports = Routes;
