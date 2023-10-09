const Routes = require("express").Router();

// Controller
const {hasilNilaiStudent, masukkanNilaiStudent} = require("../Controllers/nilaiStudentController");

// Multer File
const uploadCertificate = require("../Middleware/multerCertificate");

Routes.route("/:id")
  .get(hasilNilaiStudent)
  .post(uploadCertificate.single("certificateStudent"), masukkanNilaiStudent);

module.exports = Routes;
