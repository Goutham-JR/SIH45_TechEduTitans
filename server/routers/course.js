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
router.post("/uploadbib", upload.single("bibfile"), (req, res) => {
  // Debugging Logs
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body); 
  console.log("Uploaded File:", req.file);

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = req.file.path;

  // Read and Parse BibTeX File
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      // Parse BibTeX entries
      const parsedBib = bibtexParse.entries(data);

      // Insert into MongoDB
      await BibEntry.insertMany(parsedBib);

      // Delete the uploaded file
      fs.unlinkSync(filePath);

      res.send("BibTeX file uploaded and stored in MongoDB!");
    } catch (parseErr) {
      console.error("Error parsing BibTeX file:", parseErr);

      // Cleanup the uploaded file if parsing fails
      fs.unlinkSync(filePath);
      res.status(500).send("Error parsing BibTeX file");
    }
  });
});

// Route to Retrieve Stored BibTeX Entries
router.get("/entries", async (req, res) => {
  try {
    const entries = await BibEntry.find();
    res.json(entries);
  } catch (err) {
    console.error("Error retrieving entries:", err);
    res.status(500).send("Error retrieving entries");
  }
});

module.exports = router;
