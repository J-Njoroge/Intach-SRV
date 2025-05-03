const express = require("express");
const router = express.Router();

const Download_Controller = require("../Controllers/downloadController");

router.get("/resume/:file", Download_Controller.getResume);
router.get("/schoolrecommendation/:file", Download_Controller.getSchoolRecommendation);
router.get("/lecturerrecommendation/:file", Download_Controller.getLecturerRecommendation);
router.get("/insurancecover/:file", Download_Controller.getInsuranceCover);
router.get("/profile/:file", Download_Controller.getprofile);
router.get("/profilevideo/:file", Download_Controller.getprofilevideo);

module.exports = router;