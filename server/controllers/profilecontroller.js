const Profile = require("../models/user");
const { GridFSBucket, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { log } = require("console");

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

    console.log(userId, profilePhoto);

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
