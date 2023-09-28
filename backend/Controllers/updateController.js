const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncWrapper = require("../Middleware/asyncWrapper");

// Create Token
  const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };

// import Model
const Admin = require("../models/adminModel");
const Student = require("../models/studentModel");

// Update Data User
const updateDataUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { emailUser, namaDepan, namaBelakang, passwordUser } = req.body;

  if (emailUser.includes("gmail")) {
    const getDataAdmin = await Admin.findOne({ _id: id });

    if (!getDataAdmin) {
      res.status(404).json({ err: "data tidak ditemukan" });
    }
    if (getDataAdmin.email !== emailUser) {
      res.status(404).json({ err: "Your Email Is Wrong" });
    }

    try {
      const dataUser = await Admin.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            namaDepan: namaDepan || getDataAdmin.namaDepan,
            namaBelakang: namaBelakang || getDataAdmin.namaBelakang,
            password: passwordUser || getDataAdmin.password,
          },
        },
        { new: true }
      );
        const token = createToken(dataUser._id);
      res
        .status(201)
        .json({dataUser, token});
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  } else if (emailUser.includes("student")) {
    const getDataStudent = await Student.findOne({ _id: id });

    if (!getDataStudent) {
      res.status(404).json({ err: "data tidak ditemukan" });
    }

    if (getDataStudent.email !== emailUser) {
      res.status(404).json({ err: "Your Email Is Wrong" });
    }

    try {
      const dataUser = await Student.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            namaDepan: namaDepan || getDataStudent.namaDepan,
            namaBelakang: namaBelakang || getDataStudent.namaBelakang,
            password: passwordUser || getDataStudent.password,
          },
        },
        { new: true }
      );
      const token = createToken(dataUser._id)
      res.status(201).json({dataUser, token});
    } catch (err) {
      res.status(400).json({ err: "Can't Change Data" });
    }
  } else {
    res.status(404).json({ err: "Your Email Is Illegal" });
  }
});

module.exports = updateDataUser;
