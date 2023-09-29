// Path
const path = require("path");

// Models
const Student = require("../models/studentModel");
const FileStudent = require("../models/fileStudentModel");

// MiddleWare
const asyncWrapper = require("../Middleware/asyncWrapper");

const getAllDataStudent = async (req, res) => {
  try {
    const dataStudent = await Student.find();

    if (!dataStudent) {
      req.status(404).json({ err: "There is no data student" });
    }
    res.status(200).json({ dataStudent });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getDetailStudent = async (req, res) => {
  const id = req.params.id;

  const isExist = await Student.findById({ _id: id });

  if (!isExist) {
    res.status(404).json({ err: "Data Murid Tidak Ada" });
  } else {
    res.status(200).json(isExist);
  }
};

const inputFileStudent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { linkGithub } = req.body;
  const fileStudent = req.file.path;
  try {
    const createFile = await FileStudent.create({
      linkGithub: linkGithub,
      fileStudent: fileStudent,
      authorFile: id,
    });
    res.status(201).json(createFile);
  } catch (err) {
    res.status(404).json(err);
  }
});

const getSpesificFileStudent = async (req, res) => {
  const { id } = req.params;

  const isExistFile = await FileStudent.find({ authorFile: id});

  if (!isExistFile) {
    return res.status(404).json({ err: "student belum mengerjakan tugas akhir" });
  } else {
    res.status(200).json(isExistFile);
  }
};

module.exports = {
  getAllDataStudent,
  getDetailStudent,
  inputFileStudent,
  getSpesificFileStudent,
};