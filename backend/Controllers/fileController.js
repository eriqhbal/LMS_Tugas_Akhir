const path = require("path");

// import Models File
const Files = require("../models/fileModel");

// Wrapper Async
const asyncWrapper = require("../Middleware/asyncWrapper");

const getAllFile = async (req, res) => {
  try {
    const allFile = await Files.find();
    if (!allFile) {
      res.json({ err: "there is no Material" });
    }
    res.status(200).json(allFile);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getSpesificFile = async (req, res) => {
  const id = req.params.id;

  try {
    const getData = await Files.findOne({ _id: id });
    if (!getData) {
      res.status(404).json({ err: "data doesnt exist" });
    }
    res.status(200).json(getData);
  } catch (err) {
    res.status(404).json({err: err.message});
  }
};

const addFile = asyncWrapper(async (req, res) => {
  try {
    const { titleFile, descFile, categoryFile } = req.body;
    const file = req.file.path;
    const saveFile = await Files.create({
      titleFile,
      descFile,
      categoryFile,
      file,
    });
    return res.status(201).json(saveFile);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

const editFile = async (req, res) => {
  const { changeTitle, changeDescFile, changeCategoryFile } = req.body;
  const id = req.params.id;

  const getFile = await Files.findOne({ _id: id });

  if (!getFile) {
    res.status(404).json({ err: "materi doesn't exist" });
  }

  try {
    const saveFile = await Files.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          titleFile: changeTitle || getFile.titleFile,
          descFile: changeDescFile || getFile.descFile,
          categoryFile: changeCategoryFile || getFile.categoryFile,
        },
      },
      { new: true }
    );
    res.status(201).json(saveFile);
  } catch (err) {
    res.status(404).json(err);
  }
};

const deleteFile = asyncWrapper(async (req,res, next) => {
  const {id} = req.params;

  const getFile = await Files.findOne({_id: id});

  if(!getFile){
    res.status(404).json({err: "data doesnt exist"});
  }

  try{
    removeData = await Files.findOneAndDelete({_id: id});
    res.status(200).json({message: "success remove Data"});
  }catch(err){
    res.status(400).json(err);
  }
})

const downloadFile = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const getFile = await Files.findOne({ _id: id });

  if (!getFile) {
    return next(new Error("doesnt exist the file"));
  }

  const file = getFile.file;
  const filePath = path.join(__dirname, `../${file}`);
  res.download(filePath);
});



module.exports = {
  getAllFile,
  getSpesificFile,
  addFile,
  downloadFile,
  editFile,
  deleteFile
};
