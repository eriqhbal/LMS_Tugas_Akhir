const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
   titleFile: {
      type:String,
      trim: true,
      maxLength: [35, "Don't Give name more than 35 character"],
      required: true
   },
   descFile: {
      type: String,
      required: [true, "Desc Must Be Field"]
   },
   categoryFile: {
      type: String,
      required: [true, "Give The Category Of All Materials"]
   },
   file: {
      type: String,
      required: [true, "Please Provide The File Material"]
   }
});

module.exports = mongoose.model("file", FileSchema);