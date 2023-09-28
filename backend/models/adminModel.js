const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
   namaDepan: String,
   namaBelakang: String,
   email: String,
   password: {
      type: String,
      require: true
   }
});

module.exports = mongoose.model("admin", adminSchema);