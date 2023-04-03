const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.post("/student", studentController.uploadStudentData);
router.get("/student", studentController.getAllStudentData);

module.exports = router;
