const path = require("path");

const TaskStudent = require("../models/fileTaskStudentModel");

const asyncWrapper = require("../Middleware/asyncWrapper");

const inputTask = asyncWrapper(async (req, res) => {
  const { linkProjectGithub } = req.body;
  const fileTask = req.file.path;

  if(!linkProjectGithub || !fileTask) {
   res.status(400).json({err: "File Tugas Harus Lengkap"});
  }

  try{
   const createTaskFile = await TaskStudent.create({linkTugas: linkProjectGithub, taskFile: fileTask});
   res.status(201).json(createTaskFile);
  }catch(e){
   res.status(400).json(e);
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

const deleteTask = asyncWrapper(async (req,res,next) => {
   const {id} = req.params;

   const findTask = await TaskStudent.findOne({_id: id});

   if(!findTask){
      res.status(400).json({err: "file tidak ada"});
   }

   try{
      const removeFileTask = await TaskStudent.findOneAndDelete({_id: id});
      res.status(200).json({message: "success to remove file"})
   }catch(e) {
      res.status(400).json(e);
   }
})

module.exports = { inputTask, showTask, deleteTask };
