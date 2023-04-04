const studentMarksModel = require("../model/studentModel");

const uploadStudentData = async (req, res) => {
  try {
    const uploadData = await studentMarksModel.create(req.body);
    return res.status(201).send({ status: true, data: uploadData });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllStudentData = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const totalCount = await studentMarksModel.find().count();
    if (skip > totalCount) {
      skip = totalCount - limit;
    }
    if (skip < 0) {
      skip = 0
    }
    const details = await studentMarksModel.find({}).sort({createdAt:-1}).skip(skip).limit(limit);

    return res.status(200).send({
      status: true,
      total: totalCount,
      msg: "successful",
      data: details,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  uploadStudentData,
  getAllStudentData,
};
