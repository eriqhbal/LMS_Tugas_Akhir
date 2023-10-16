const Routes = require("express").Router();

// Controller
const {hasilNilaiStudent, masukkanNilaiStudent, downloadCertificateStudent} = require("../Controllers/nilaiStudentController");

// Multer File
const uploadCertificate = require("../Middleware/multerCertificate");

Routes.route("/:id")
  .get(hasilNilaiStudent)
  .post(uploadCertificate.single("certificateStudent"), masukkanNilaiStudent);

Routes.route("/downloadCertificate/:id").get(downloadCertificateStudent)

module.exports = Routes;
