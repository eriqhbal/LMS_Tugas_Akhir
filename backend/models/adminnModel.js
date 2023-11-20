const mongoose = require("mongoose");

const AdminKelola = new mongoose.Schema({
   email: {
      required: [true, "Email Wajib Diisi"],
      type: String
   },
   password: {
      type: String,
      required: [true, "Admin Wajib Mengisi Password"]
   }
});

module.exports = mongoose.model("Adminkelola", AdminKelola);