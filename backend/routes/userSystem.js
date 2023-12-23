const express = require("express");
const Routes = express.Router();

// Controllers
const {
  limitStudent,
  getAllDataStudent,
  getDetailStudent,
  removeStudent,
  loadDataStudent,
  ascSortingData,
} = require("../Controllers/studentController");
const updateDataUser = require("../Controllers/updateController");
const {
  addTeacherController,
  removeTeacherController,
  getAllTeacher,
} = require("../Controllers/addTeacher");
const getSpesificTeacher = require("../Controllers/teacherController");

Routes.route('/loadData').post(loadDataStudent);

Routes.route('/ascendingData').post(ascSortingData);

Routes.route("/students")
  .get(getAllDataStudent)
  .post(() => {})
  .patch(() => {})
  .delete(() => {});

Routes.route("/student/:id")
  .get(getDetailStudent)
  .patch(updateDataUser)
  .delete(removeStudent);

Routes.route("/admin/:id")
  .get(getSpesificTeacher)
  .post(() => {})
  .patch(updateDataUser)
  .delete(() => {});

Routes.route("/addTeacher").get(getAllTeacher).post(addTeacherController);

Routes.route("/removeTeacher/:id").delete(removeTeacherController);

module.exports = Routes;
