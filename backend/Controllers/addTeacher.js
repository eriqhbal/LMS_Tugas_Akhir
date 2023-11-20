const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

// Model Teacher
const Teacher = require("../models/adminModel");

// Create JWT for user
function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
}

const getAllTeacher = async (req, res) => {
  const allTeacher = await Teacher.find();

  if (allTeacher == null) {
    res
      .status(404)
      .json({
        err: "Tidak Ada Satupun Pengajar, Silahkan Daftarkan pengajar terbaik",
      });
    return;
  } else {
    res.status(200).json(allTeacher);
  }
};

const addTeacherController = (req, res) => {
  const { namaDepan, namaBelakang, emailRegister, password } = req.body;

  if (!namaDepan || !namaBelakang || !emailRegister || !password) {
    res.status(404).json({ err: "Form tidak boleh ada yang kosong" });
    return;
  }

  if (!validator.isEmail(emailRegister)) {
    res.status(404).json({ err: "email tidak valid" });
    return;
  }

  if (!emailRegister.includes("gmail")) {
    res.status(400).json({ err: "Email Anda tidak valid" });
    return;
  }

  try {
    Teacher.findOne({ email: emailRegister }, (err, dataTeacher) => {
      if (!err) {
        if (dataTeacher !== null) {
          if (dataTeacher.email == emailRegister) {
            res.status(400).json({ error: "email sudah digunakan" });
            return;
          }
        } else {
          const newTeacher = Teacher.create({
            email: emailRegister,
            namaDepan,
            namaBelakang,
            password,
          });
          createToken(newTeacher._id);
          res.status(201).json({ success: "Akun Berhasil Digunakan" });
          return;
        }
      } else {
        res.status(404).json({ err: "Your Input is wrong" });
      }
    });
  } catch (e) {
    res.status(404).json({ e: e.message });
  }
};

const removeTeacherController = async (req, res) => {
  const { id } = req.params;

  const isTeacherExist = await Teacher.findById({ _id: id });

  if (!isTeacherExist) {
    res.status(404).json({ error: "Data Pengajar Tidak Ada" });
  }

  try {
    Teacher.findByIdAndDelete({ _id: id }, (err, dataTeacher) => {
      if (!err) {
        res.status(200).json({ message: "Data Pengajar Berhasil Dihapus" });
      }
    });
  } catch (e) {
    res.status(404).json({ error: "prosesnya gagal" });
  }
};

module.exports = {
  getAllTeacher,
  addTeacherController,
  removeTeacherController,
};
