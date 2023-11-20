const Teacher = require("../models/adminModel");

const getSpesificTeacher = async (req, res) => {
  const { id } = req.params;

  const isTeacherExist = await Teacher.findById({ _id: id });

  if (!isTeacherExist) {
    res.status(404).json({ err: "Data Pengajar Tidak Ditemukan" });
  }

  try {
    if (isTeacherExist) res.status(200).json(isTeacherExist);
  } catch (e) {
    res.status(404).json({ e: e.message });
  }
};

module.exports = getSpesificTeacher;
