const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// import data model
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const AdminKelola = require("../models/adminnModel");

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
            return;
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
              return;
            } else {
              res.status(400).json({ error: "Email Atau Password Anda Salah" });
              return;
            }
          } else {
            res.status(400).json({ error: "Data Tidak Ditemukan" });
          }
        }
      });
    } else if (email.includes("admin")) {
      AdminKelola.findOne({email: email}, (err, dataUser) => {
        console.log(dataUser)
        if(err) {
          res.status(404).json({error: "Data Admin Tidak Ditemukan"})
        } else {
          if(dataUser){
          if (dataUser.password == password) {
            const token = createToken(dataUser._id);
            res.status(200).json({ dataUser, token });
          } else {
            res.status(404).json({ error: "Email or Password salah" });
          }
          } else {
            res.status(404).json({error: "Admin Hanya 1 Pada Sistem"})
          }

        }
      })
    } else {
      res.status(400).json({ error: "your email is illegal" });
    }
  });

module.exports = router;
