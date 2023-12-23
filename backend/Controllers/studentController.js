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
    const isMoreFive = await Student.find().count();

    if (!dataStudent) {
      res.status(404).json({ err: "There is no data student" });
      return;
    }

    if (isMoreFive > 5) {
      const getLimit = await Student.find().limit(5);
      res.status(200).json(getLimit);
      return;
    } else {
      res.status(200).json(dataStudent);
      return;
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
    return;
  }
};

const loadDataStudent = async (req, res) => {
  const { countData } = req.body;

  const parseCount = parseInt(countData)

  const allData = await Student.find();
  const manyData = await Student.find().count();
  const addData = await Student.find().limit(parseCount);

  if(parseCount > manyData){
    res.status(200).json(allData);
    return;
  } else {
  res.status(200).json(addData);
  return;
  }
}

const ascSortingData = async (req, res) => {
  const { sortData, manyData } = req.body;

  const sortDataParse = parseInt(sortData);
  const manyDataParse = parseInt(manyData);
  
  const isExisttudentAsc = await Student.find().limit(manyDataParse).sort({ namaDepan: sortDataParse});

  res.json(isExisttudentAsc)
}

const getDetailStudent = async (req, res) => {
  const id = req.params.id;

  const isExist = await Student.findById({ _id: id });

  if (!isExist) {
    res.status(404).json({ err: "Data Murid Tidak Ada" });
    return;
  } else {
    res.status(200).json(isExist);
    return;
  }
};

const removeStudent = async (req, res) => {
  const { id } = req.params;

  const findStudent = await Student.findOne({ _id: id });

  if (!findStudent) {
    res.status(404).json({ err: "Akun Tidak Ditemukan" });
  }

  try {
    const removeStudentAkun = await Student.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: "Akun Berhasil Dihapus" });
  } catch (e) {
    res.status(404).json({ e: e.message });
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
    res.status(201).json({ msg: "Jawaban TA berhasil terkirim!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

const getSpesificFileStudent = async (req, res) => {
  const { id } = req.params;

  const isExistFile = await FileStudent.find({ authorFile: id });

  if (!isExistFile) {
    return res
      .status(404)
      .json({ err: "student belum mengerjakan tugas akhir" });
  } else {
    res.status(200).json(isExistFile);
  }
};

const downloadFileStudent = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const getFileStudent = await FileStudent.findOne({ _id: id });

  if (!getFileStudent) {
    return next(new Error("doesnt exist the file"));
  }

  const fileStudent = getFileStudent.fileStudent;
  const filePath = path.join(__dirname, `../${fileStudent}`);
  res.download(filePath);
});

module.exports = {
  getAllDataStudent,
  loadDataStudent,
  getDetailStudent,
  ascSortingData,
  removeStudent,
  inputFileStudent,
  getSpesificFileStudent,
  downloadFileStudent,
};
