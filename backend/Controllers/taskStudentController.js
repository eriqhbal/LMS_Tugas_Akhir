const path = require("path");

const TaskStudent = require("../models/fileTaskStudentModel");

const asyncWrapper = require("../Middleware/asyncWrapper");

const inputTask = asyncWrapper(async (req, res) => {
  const { linkProjectGithub } = req.body;
  const fileTask = req.file.path;

  if(!linkProjectGithub || fileTask === undefined) {
   res.status(400).json({err: "File Tugas Harus Lengkap"});
   return;
  }

  try{
   await TaskStudent.create({linkTugas: linkProjectGithub, taskFile: fileTask});
   res.status(201).json({msg: "Task Berhasil Dikirim!"});
   return;
  }catch(e){
   res.status(400).json(e);
   return;
  }
});

const showTask =  (req, res) => {
   TaskStudent.find({}, (err, file) => {
      if(err){
         res.status(404).json({err: "file tidak ada"});
      }else {
         res.status(200).json(file);
      }
   })
};

const donwloadTask = asyncWrapper(async (req,res) => {
   const {id} = req.params;

   const isExist = await TaskStudent.findById({_id: id});

   if(!isExist){
      res.status(404).json({err: "File tidak ditemukan"});
   }

   try{
      const taskFile = isExist.taskFile;
      const filePath = path.join(__dirname, `../${taskFile}`);
      res.download(filePath)
   }catch(err){
      res.status(400).json({err: "file tidak bisa di download, karena ada kesalahan"});
   }
})

const deleteTask = asyncWrapper(async (req,res,next) => {
   const {id} = req.params;

   const findTask = await TaskStudent.findOne({_id: id});

   if(!findTask){
      res.status(400).json({err: "file tidak ada"});
   }

   try{
      const removeFileTask = await TaskStudent.findOneAndDelete({_id: id});
      res.status(200).json(removeFileTask)
   }catch(e) {
      res.status(400).json(e);
   }
});

module.exports = { inputTask, showTask, donwloadTask, deleteTask };
