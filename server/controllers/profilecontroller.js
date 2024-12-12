const Profile = require("../models/user");
const Resume = require("../models/resume");

const { GridFSBucket, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { log } = require("console");
const pdfparse = require('pdf-parse');
const keywordExtractor = require('keyword-extractor');

const uri = "mongodb://localhost:27017"; // MongoDB connection string
const databaseName = "ELearning"; // Database name
const bucketName = "uploads"; // GridFS bucket name

const client = new mongoose.mongo.MongoClient(uri);

const uploadFile = async (filePath, bucket, providedMimeType = null) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const contentType =
      providedMimeType || mime.lookup(filePath) || "application/octet-stream";

    const uploadStream = bucket.openUploadStream(fileName, {
      chunkSizeBytes: 1024 * 1024, // 1MB
      contentType,
    });

    const readStream = fs.createReadStream(filePath);

    readStream.on("error", (err) => {
      console.error(`Error reading file ${fileName}:`, err);
      reject(err);
    });

    uploadStream
      .on("finish", () => {
        console.log(`Upload finished for ${fileName}, ID: ${uploadStream.id}`);
        resolve(uploadStream.id);
      })
      .on("error", (err) => {
        console.error(`Upload error for ${fileName}:`, err);
        reject(err);
      });

    readStream.pipe(uploadStream);
  });
};

// Upload Profile Photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.fields;
    const profilePhoto = req.files.profilePhoto;


    if (!userId || !profilePhoto) {
      return res.status(400).json({
        error: "User ID and profile photo file are required",
      });
    }

    await mongoose.connect("mongodb://localhost:27017/ELearning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName });

    // Upload profile photo
    const profilePhotoId = await uploadFile(
      profilePhoto.path,
      bucket,
      profilePhoto.mimetype || "image/jpeg"
    );

    // Find or create a profile
    let profile = await Profile.findById(userId);
    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      profile.profilePhoto = profilePhotoId;
    }

    await profile.save();

    res.status(200).json({
      message: "Profile photo uploaded successfully!",
      profilePhotoId,
    });
  } catch (err) {
    console.error("Error uploading profile photo:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Serve Profile Photo
exports.getProfilePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Profile ID" });
    }

    const profile = await Profile.findById(id).populate("profilePhoto");

    if (!profile || !profile.profilePhoto) {
      return res.status(404).json({ error: "Profile or photo not found" });
    }

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName });
    const file = await conn
    .collection(`${bucketName}.files`)
    .findOne({ _id: new ObjectId(profile.profilePhoto) });
  
  

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const contentType = file.contentType || "application/octet-stream";
    res.set("Content-Type", contentType);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      console.error("Error during file streaming:", error);
      res.status(500).json({ error: "File streaming error" });
    });
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.uploadResume = async (req, res) => {
  try {
    const { userId } = req.fields;
    const resumeFile = req.files.resume;

    if (!userId || !resumeFile) {
      return res.status(400).json({
        error: "User ID and resume file are required",
      });
    }

    await mongoose.connect("mongodb://localhost:27017/ELearning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });

    // Upload resume file
    const resumeFileId = await uploadFile(
      resumeFile.path,
      bucket,
      resumeFile.mimetype || "application/pdf"
    );

    // Find or create a profile
    let profile = await Profile.findById(userId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    } else {
      profile.resume = resumeFileId;
    }

    await profile.save();

    function isSkillRelated(word) {
      const commonWords = [
        'the', 'and', 'for', 'with', 'from', 'this', 'that',
        'are', 'you', 'your', 'all', 'can', 'any', 'has',
        'have', 'will', 'not', 'but', 'use', 'was', 'had', 'added','cpga','held','time','good'
      ];
      return word.length > 2 && !/\d/.test(word) && !commonWords.includes(word);
    }

    const pdffile = fs.readFileSync(resumeFile.path);

    const data = await pdfparse(pdffile);
    const textContent = data.text;

    // Extract keywords using the keyword extractor
    const extractedKeywords = keywordExtractor.extract(textContent, {
      language: 'english',
      remove_digits: false, // Keep digits for initial extraction
      return_changed_case: true,
      remove_duplicates: true,
    });

    // Dynamically filter out non-skill-related keywords
    const skillRelatedKeywords = extractedKeywords.filter(isSkillRelated);

    let resume = await Resume.findOne({ userId });
    if (!resume) {
      resume = new Resume({ userId, keywords: skillRelatedKeywords });
    } else {
      resume.keywords = skillRelatedKeywords;
    }
    await resume.save();


    res.status(200).json({
      message: "Resume uploaded successfully!",
      resumeFileId,
    });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Serve Resume
exports.getResume = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Profile ID" });
    }

    const profile = await Profile.findById(id).populate("resume");

    if (!profile || !profile.resume) {
      return res.status(404).json({ error: "Profile or resume not found" });
    }

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName });
    const file = await conn
      .collection(`${bucketName}.files`)
      .findOne({ _id: new ObjectId(profile.resume) });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const contentType = file.contentType || "application/octet-stream";
    res.set("Content-Type", contentType);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      console.error("Error during file streaming:", error);
      res.status(500).json({ error: "File streaming error" });
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Server error" });
  }
};
