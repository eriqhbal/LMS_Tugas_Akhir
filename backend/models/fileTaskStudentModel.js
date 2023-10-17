const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
   linkTugas: {
      type: String,
      required: true
   },
   taskFile: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model("taskStudent", taskSchema);