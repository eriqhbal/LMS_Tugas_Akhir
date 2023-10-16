const path = require("path");

// Model
const NilaiStudent = require("../models/nilaiStudentModel");

// Wrapper
const asyncWrapper = require("../Middleware/asyncWrapper");

const masukkanNilaiStudent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { nilaiStudent, alasanNilai } = req.body;
  const certificateStudent = req.file.path;

  if (nilaiStudent === "") {
    res.status(400).json({ err: "Nilai Tidak Boleh Kosong" });
  } else if (alasanNilai === "") {
    res.status(400).json({
      err: "Harus Memberikan Alasan Mengapa Memberikan Nilai Tersebut",
    });
  }

  try {
    const findNilai = await NilaiStudent.create({
      nilaiStudent: nilaiStudent,
      alasanNilai: alasanNilai,
      certificateStudent: certificateStudent,
      padaMahasiswa: id,
    });
    res.status(201).json({ findNilai });
  } catch (err) {
    res.status(400).json({ err: err.message });
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
  const {id} = req.params;

  const getFile = await NilaiStudent.findOne({_id: id});

  if(!getFile){
    res.status(404).json({err: "file Doesnt Exist"});
  }

  const certificateStudent = getFile.certificateStudent;

  const filePath = path.join(__dirname, `../${certificateStudent}`);
  res.download(filePath);
});

module.exports = { masukkanNilaiStudent, hasilNilaiStudent, downloadCertificateStudent };
