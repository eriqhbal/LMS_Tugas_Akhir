const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("../models/studentModel");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
}

const signUpController = async (req, res) => {
  const { nameUserFront, nameUserBack, newPassword, emailUser } = req.body;

  try {
    const newUser = await Student.signUp(
      nameUserFront,
      nameUserBack,
      newPassword,
      emailUser
    );

    const token = createToken(newUser._id);
    res.status(200).json({ newUser, token });
  } catch (e) {
    res.status(400).json({ e: e.message });
  }
};

module.exports = signUpController;
