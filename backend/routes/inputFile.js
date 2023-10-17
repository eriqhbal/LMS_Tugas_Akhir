const express = require("express");
const Router = express.Router();

// Controller
const {
  getAllFile,
  addFile,
  downloadFile,
  editFile,
  getSpesificFile,
  deleteFile,
} = require("../Controllers/fileController");

// File Student
const {
  inputFileStudent,
  getSpesificFileStudent,
  downloadFileStudent,
} = require("../Controllers/studentController");

// Upload
const upload = require("../Middleware/multerFile");
const uploadFileStudent = require("../Middleware/multerFileStudent");
const uploadTask = require("../Middleware/multerTaskStudent");
const { inputTask, showTask, deleteTask } = require("../Controllers/taskStudentController");



Router.route("/material")
  .get(getAllFile)
  .post((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

Router.route("/material/:id").get(getSpesificFile).delete(deleteFile);

Router.route("/upload")
  .get(() => {})
  .post(upload.single("file"), addFile)
  .patch(() => {})
  .delete(() => {});

Router.route("/download/:id")
  .get(downloadFile)
  .post(() => {})
  .patch(editFile);

Router.route("/fileStudent/:id")
  .get(getSpesificFileStudent)
  .post(uploadFileStudent.single("fileStudent"), inputFileStudent);

Router.route("/taskDownload/:id").get(downloadFileStudent)

Router.route("/taskStudent").get(showTask).post(uploadTask.single("fileTask"), inputTask)
Router.route("/taskStudent/:id").delete(deleteTask)

module.exports = Router;
