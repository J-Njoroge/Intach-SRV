const express = require("express");
const fs = require("fs");
const path = require("path");


const getResume = (req, res) => {
  const address = path.join(__dirname, `../public/resume/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}


const getSchoolRecommendation = (req, res) => {
  const address = path.join(__dirname, `../public/schoolrecommendation/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}


const getLecturerRecommendation = (req, res) => {
  const address = path.join(__dirname, `../public/lecturerrecommendation/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}


const getInsuranceCover = (req, res) => {
  const address = path.join(__dirname, `../public/insurancecover/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}

const getprofile = (req, res) => {
  const address = path.join(__dirname, `../public/profile/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}

const getprofilevideo = (req, res) => {
  const address = path.join(__dirname, `../public/profilevideo/${req.params.file}`);
  fs.access(address, fs.F_OK, (err) => {
    if (err) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }
    res.sendFile(address);
  });
}

const Download_Controller = {
    getResume,
    getSchoolRecommendation,
    getLecturerRecommendation,
    getInsuranceCover,
    getprofile,
    getprofilevideo

};

module.exports = Download_Controller;
