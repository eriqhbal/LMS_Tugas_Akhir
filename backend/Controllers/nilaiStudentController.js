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

const hasilNilaiStudent = async (req,res) => {

}

module.exports = {masukkanNilaiStudent, hasilNilaiStudent};
