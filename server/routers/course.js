const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const bibtexParse = require("bibtex-parse");
const BibEntry = require("../models/BibEntry"); // Assuming BibEntry is your Mongoose model

// Multer Configuration
const upload = multer({ dest: "uploads/" }); // Temporary folder for file uploads

// Other Routes
const {
  create,
  uploadtrailer,
  uploadweeks,
  uploadquiz,
  requestfile,
  seachcoursebyname,
  getCourseById,
  finalize,
  getCourseDuration,
  getCourseresource,
} = require("../controllers/courseController");

router.post("/create", create);
router.post("/uploadtrailer", uploadtrailer);
router.post("/uploadweeks", uploadweeks);
router.post("/uploadquiz", uploadquiz);
router.get("/media/:id", requestfile);

router.get("/search", seachcoursebyname);
router.get("/courses/:id", getCourseById);
router.post("/finalize", finalize);
router.get("/getcourseduration/:id", getCourseDuration);
router.get("/getcourseresource/:id", getCourseresource);

// BibTeX File Upload and Parsing Route


module.exports = router;
