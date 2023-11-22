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
  namaDepan,
  nameBelakang,
  password,
  emailUser
) {
  const alreadyUser = await this.findOne({ email: emailUser });

  if (alreadyUser) {
    throw Error("Email Sudah Digunakan");
  }

  if (!namaDepan || !nameBelakang || !emailUser || !password) {
    throw Error("Form Tidak Boleh Ada Yang Kosong!");
  }

  if (!validator.isEmail(emailUser)) {
    throw Error("Email Tidak Valid!");
  }

  if (!emailUser.includes("student")) {
    throw Error("Harus Menggunakan Email Student UIR");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password Anda Tidak Kuat, harus mengandung huruf capital, angka, simbol"
    );
  }

  const dataUser = await this.create({
    namaDepan: namaDepan,
    namaBelakang: nameBelakang,
    email: emailUser,
    password: password,
  });

  return dataUser;
};


module.exports = mongoose.model("dataStudent", studentSchema);
