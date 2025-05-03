const express = require("express");
const multer = require("multer");
// const fs = require("fs");
// const { v5: uuidv5 } = require("uuid");
// const { promisify } = require("util");
const ResumeParser = require('resume-parser');

// const pipeline = promisify(require("stream").pipeline);

const {pipeline} = require('stream');
const {promisify} = require('util');
const pipelineAsync = promisify(pipeline); // Wrap pipeline to use it as a promise
const fs = require('fs').promises;
const {v5: uuidv5} = require('uuid');

const postResume = async (req, res) => {
    console.log(req.file);
    const {file} = req;
    console.log(file.originalname.split('.')[1]);

    if (file.originalname.split('.')[1] != "pdf") {
        console.log("Invalid format");
        return res.status(400).json({
            message: "Invalid format",
        });
    } else {
        const filename = `${uuidv5(file.originalname, uuidv5.DNS)}.pdf`;
        console.log(filename);
        const filePath = `${__dirname}/../public/resume/${filename}`;

        try {
            await fs.writeFile(filePath, file.buffer); // Write the file
            console.log("File uploaded successfully");
            res.send({
                message: "File uploaded successfully",
                url: `/host/resume/${filename}`,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Error while uploading",
            });
        }
    }
};

const postSchoolRecommendation = async (req, res) => {
    console.log(req.file);
    const {file} = req;
    console.log(file.originalname.split('.')[1]);

    if (file.originalname.split('.')[1] != "pdf") {
        console.log("Invalid format");
        return res.status(400).json({
            message: "Invalid format",
        });
    } else {
        const filename = `${uuidv5(file.originalname, uuidv5.DNS)}.pdf`;
        console.log(filename);
        const filePath = `${__dirname}/../public/schoolrecommendation/${filename}`;

        try {
            await fs.writeFile(filePath, file.buffer); // Write the file
            console.log("File uploaded successfully");
            res.send({
                message: "File uploaded successfully",
                url: `/host/schoolrecommendation/${filename}`,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Error while uploading",
            });
        }
    }
};



const postLecturerRecommendation = async (req, res) => {
    console.log(req.file);
    const {file} = req;
    console.log(file.originalname.split('.')[1]);

    if (file.originalname.split('.')[1] != "pdf") {
        console.log("Invalid format");
        return res.status(400).json({
            message: "Invalid format",
        });
    } else {
        const filename = `${uuidv5(file.originalname, uuidv5.DNS)}.pdf`;
        console.log(filename);
        const filePath = `${__dirname}/../public/lecturerrecommendation/${filename}`;

        try {
            await fs.writeFile(filePath, file.buffer); // Write the file
            console.log("File uploaded successfully");
            res.send({
                message: "File uploaded successfully",
                url: `/host/lecturerrecommendation/${filename}`,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Error while uploading",
            });
        }
    }
};



const postInsuranceCover = async (req, res) => {
    console.log(req.file);
    const {file} = req;
    console.log(file.originalname.split('.')[1]);

    if (file.originalname.split('.')[1] != "pdf") {
        console.log("Invalid format");
        return res.status(400).json({
            message: "Invalid format",
        });
    } else {
        const filename = `${uuidv5(file.originalname, uuidv5.DNS)}.pdf`;
        console.log(filename);
        const filePath = `${__dirname}/../public/insurancecover/${filename}`;

        try {
            await fs.writeFile(filePath, file.buffer); // Write the file
            console.log("File uploaded successfully");
            res.send({
                message: "File uploaded successfully",
                url: `/host/insurancecover/${filename}`,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Error while uploading",
            });
        }
    }
};


const postProfile = async (req, res) => {
    const { file } = req;

    // Ensure there's a file in the request
    if (!file) {
        return res.status(400).json({
            message: "No file uploaded.",
        });
    }

    // Extract the file extension from the original filename and convert it to lowercase
    const fileExtension = file.originalname.split('.').pop().toLowerCase();

    // Check if the file extension is either jpg or png
    if (fileExtension !== "jpg" && fileExtension !== "png") {
        return res.status(400).json({
            message: "Invalid format. Only JPG and PNG are allowed.",
        });
    }

    // Generate a unique filename for the uploaded image
    const filename = `${uuidv5(file.originalname, uuidv5.URL)}.${fileExtension}`;
    const outputPath = `${__dirname}/../public/profile/${filename}`;

    try {
        // Await the asynchronous operation to write the file buffer to the output path
        await fs.writeFile(outputPath, file.buffer);
        console.log("Profile image uploaded successfully");

        // Respond to the client with the success message and the URL of the uploaded image
        res.send({
            message: "Profile image uploaded successfully",
            url: `/host/profile/${filename}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error while uploading",
        });
    }
};




const Upload_Controller = {
    postResume,
    postSchoolRecommendation,
    postLecturerRecommendation,
    postInsuranceCover,
    postProfile
}
module.exports = Upload_Controller;
