const mongoose = require("mongoose");

const nilaiStudentSchema = new mongoose.Schema({
   nilaiStudent: {
      type: String,
      required: true,
      min:0,
      max: 100
   },
   alasanNilai: {
      type: String,
      required: true
   },
   certificateStudent: {
      type: String,
   },
   padaMahasiswa: {
      type: String
   }
});

module.exports = mongoose.model("nilaiStudent", nilaiStudentSchema);