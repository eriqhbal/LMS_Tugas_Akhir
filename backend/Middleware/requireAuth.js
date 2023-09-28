const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req,res, next) => {
   const {authorization} = req.headers;

   if(!authorization){
      res.status(401).json({error: "Harus Menyertakan Token Authorization"});  
   }

   const token = authorization.split(" ")[1];

   try{
      const {_id} = jwt.verify(token, process.env.SECRET);
      req.user = await Student.findOne({_id}).select("_id");
      next();
   }catch(e){
      res.status(400).json({erro: "permintaan belum ter-auntentikasi"});
   }
}

module.exports = requireAuth;