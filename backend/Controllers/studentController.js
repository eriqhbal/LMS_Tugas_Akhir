
// Models
const Student = require("../models/studentModel");

const getAllDataStudent = async(req,res) => {

   try{
      const dataStudent = await Student.find();

      if(!dataStudent){
         req.status(404).json({err: "There is no data student"});
      }
      res.status(200).json({dataStudent});
   }catch(err){
      res.status(400).json({err: err.message});
   }
}

const getDetailStudent = async (req,res) => {
   const id = req.params.id;

   const isExist = await Student.findById({_id: id});
   
   if(!isExist){
      res.status(404).json({err: "Data Murid Tidak Ada"})
   }else {
      res.status(200).json(isExist);
   }
}

module.exports = {getAllDataStudent, getDetailStudent};