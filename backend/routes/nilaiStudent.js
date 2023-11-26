const Routes = require("express").Router();

// Controller
const {hasilNilaiStudent, masukkanNilaiStudent, downloadCertificateStudent, masukkanCertificateStudent} = require("../Controllers/nilaiStudentController");

// Multer File
const uploadCertificate = require("../Middleware/multerCertificate");

Routes.route("/:id")
  .get(hasilNilaiStudent)
  .post(masukkanNilaiStudent);

Routes.route("/certificateForStudent/:id").post(uploadCertificate.single("certificateStudent"), masukkanCertificateStudent);

Routes.route("/downloadCertificate/:id").get(downloadCertificateStudent)

module.exports = Routes;
