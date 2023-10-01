const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("../models/studentModel");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
}

const signUpController = async (req, res) => {
  const { namaDepan, namaBelakang, password, emailUser } = req.body;

  try {
    const dataUser = await Student.signUp(
      namaDepan,
      namaBelakang,
      password,
      emailUser
    );

    const token = createToken(dataUser._id);
    res.status(200).json({ dataUser, token });
  } catch (e) {
    res.status(400).json({ e: e.message });
  }
};

module.exports = signUpController;
