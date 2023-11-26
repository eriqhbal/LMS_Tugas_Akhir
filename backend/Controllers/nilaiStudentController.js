const path = require("path");

// Model
const NilaiStudent = require("../models/nilaiStudentModel");
const SendCertificate = require("../models/giveCertificateStudent");

// Wrapper
const asyncWrapper = require("../Middleware/asyncWrapper");

const masukkanCertificateStudent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const certificateStudent = req.file.path;
  
  try {
    const sendCertificate = await SendCertificate.create({
      certificateStudent: certificateStudent,
      mahasiswa: id,
    });
    res.status(201).json({success: "Sertifikat Berhasil Di-inputkan!"});
  } catch (err) {
    res.status(400).json({ err: "tidak bisa menginputkan sertifikat mungkin tidak ada file" });
  }
});

const masukkanNilaiStudent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { nilaiStudent, alasanNilai } = req.body;

  try {
    const findNilai = await NilaiStudent.create({
      nilaiStudent: nilaiStudent,
      alasanNilai: alasanNilai,
      padaMahasiswa: id,
    });
    res.status(201).json({message: "Nilai Berhasil Diinputkan!"});
  } catch (err) {
    res.status(400).json({ err: "Form Tidak Boleh Ada yang Kosong!" });
  }
});

const hasilNilaiStudent = async (req, res) => {
  const { id } = req.params;

  const findResult = await NilaiStudent.find({ padaMahasiswa: id });

  if (!findResult) {
    res.status(404).json({ err: "not Found" });
  }

  res.status(200).json(findResult);
};

const downloadCertificateStudent = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const getFile = await SendCertificate.findOne({ mahasiswa: id });

  if (!getFile) {
    res.status(404).json({ err: "file Doesnt Exist" });
  }

  const certificateStudent = getFile.certificateStudent;

  const filePath = path.join(__dirname, `../${certificateStudent}`);
  res.download(filePath);
});

module.exports = {
  masukkanNilaiStudent,
  hasilNilaiStudent,
  downloadCertificateStudent,
  masukkanCertificateStudent,
};
