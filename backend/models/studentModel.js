const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  namaDepan: String,
  namaBelakang: String,
  email: String,
  password: {
    type: String,
    require: true,
  },
});

studentSchema.statics.signUp = async function (
  nameUserFront,
  nameUserBack,
  newPassword,
  emailUser
) {
  const alreadyUser = await this.findOne({ emailStudent: emailUser });

  if (alreadyUser) {
    throw Error("Email Sudah Digunakan");
  }

  if (!nameUserFront || !nameUserBack || !emailUser || !newPassword) {
    throw Error("Form Tidak Boleh Ada Yang Kosong!");
  }

  if (!validator.isEmail(emailUser)) {
    throw Error("Email Tidak Valid!");
  }

  if (!emailUser.includes("student")) {
    throw Error("Harus Menggunakan Email Student UIR");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error(
      "Password Anda Tidak Kuat, harus mengandung huruf capital, angka, simbol"
    );
  }

  const newUser = await this.create({
    namaDepan: nameUserFront,
    namaBelakang: nameUserBack,
    email: emailUser,
    password: newPassword,
  });

  return newUser;
};


module.exports = mongoose.model("dataStudent", studentSchema);
