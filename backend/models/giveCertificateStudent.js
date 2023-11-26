const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
   certificateStudent: {
      type: String,
      required: true,
   },
   mahasiswa: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("certificate", certificateSchema);