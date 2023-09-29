const mongoose = require("mongoose");

// Import Model Student

const FileStudent = new mongoose.Schema({
   linkGithub: String,
   fileStudent: {
      type: String,
      required: [true, "Harus Memasukkan File Tugas Anda"]
   },
   authorFile: String
});

module.exports = mongoose.model("FileStudet", FileStudent);