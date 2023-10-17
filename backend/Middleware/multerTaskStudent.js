const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
   destination: (req,file,cb) => {
      cb(null, "TaskStudent/")
   },
   filename: (req,file,cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
   }
});

const filterFile = (req,file,cb) => {
   if(file.mimetype === "application/pdf"){
      cb(null,true);
   } else {
      cb(null, false)
   }
};

const uploadTask = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   filterFile
});

module.exports = uploadTask;