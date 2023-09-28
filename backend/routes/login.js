const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// import data model
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
}

router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Form Tidak Boleh Kosong" });
    }

    if (email.includes("student")) {
      Student.findOne({ email: email }, (err, dataUser) => {
        if (!err) {
          if (dataUser) {
            if (dataUser.password == password) {
              const token = createToken(dataUser._id);
              res.status(200).json({ dataUser, token });
            } else {
              res.status(400).json({ error: "Email atau Password Anda Salah" });
            }
          } else {
            res.status(404).json({ error: "Email Anda Belum Terdaftar!" });
          }
        }
      });
    } else if (email.includes("gmail")) {
      Admin.findOne({ email: email }, (err, dataUser) => {
        if (!err) {
          if (dataUser) {
            if (dataUser.password == password) {
              const token = createToken(dataUser._id);
              res.status(200).json({dataUser, token});
            } else {
              res.status(400).json({ error: "Email Atau Password Anda Salah" });
            }
          } else {
            res.status(400).json({ error: "Hanya Ada 1 Admin!" });
          }
        }
      });
    } else {
      res.status(400).json({ error: "your email is illegal" });
    }
  });

module.exports = router;
