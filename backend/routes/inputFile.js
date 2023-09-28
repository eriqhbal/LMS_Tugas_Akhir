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

// Upload
const upload = require("../Middleware/multerFile");

Router.route("/material")
  .get(getAllFile)
  .post((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

Router.route("/material/:id").get(getSpesificFile).delete(deleteFile)

Router.route("/upload")
  .get(() => {})
  .post(upload.single("file"), addFile)
  .patch(() => {})
  .delete(() => {});

Router.route("/download/:id")
  .get(downloadFile)
  .post(() => {})
  .patch(editFile);

module.exports = Router;
