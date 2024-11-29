const Course = require("../models/course"); // Correct import for Mongoose model
const multer = require("multer");
const upload = multer();
const { GridFSBucket, MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const mime = require("mime-types");

exports.create = async (req, res) => {
  try {
    console.log("Parsed Fields:", req.fields);

    const {
      userId, courseTitle, courseDescription, whatyouwilllearn,requirements} = req.fields;

    const newCourse = new Course({
      userId,
      title: courseTitle,
      description: courseDescription,
      learnPoints: whatyouwilllearn,
      requirements: requirements,
    });
    console.log("New Course:", newCourse);
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Parsed successfully!", courseId: newCourse._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadtrailer = async (req, res) => {
  try {
    console.log("Received POST request for /api/course/uploadtrailer");

    const { courseId } = req.fields;
    const trailer = req.files.trailer;

    if (!courseId || !trailer) {
      return res
        .status(400)
        .json({ error: "Course ID and trailer file are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const filepath = trailer.path;

    await mongoose.connect("mongodb://localhost:27017/ELearning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });

    try {
      await checkFileAccess(filepath);
      const fileId = await uploadFile(filepath, bucket);
      course.trailerId = fileId;
      await course.save();

      res
        .status(200)
        .json({ message: "Trailer uploaded successfully!", trailerId: fileId });
    } catch (err) {
      console.error("Error during file upload:", err);
      res.status(500).json({ error: "File upload error" });
    }
  } catch (err) {
    console.error("Error handling upload trailer:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadweeks = async (req, res) => {
  try {
    const { courseId, weekNumber, title, description } = req.fields;
    const videoFile = req.files.video;
    const thumbnailFile = req.files.thumbnail;
    const resourceFile = req.files.resource;

    if (
      !courseId ||
      !weekNumber ||
      !title ||
      !description ||
      !videoFile ||
      !thumbnailFile
    ) {
      return res.status(400).json({
        error:
          "All fields are required, including courseId, weekNumber, title, description, video file, and thumbnail file.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await mongoose.connect("mongodb://localhost:27017/ELearning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });

    try {
      await checkFileAccess(videoFile.path);
      await checkFileAccess(thumbnailFile.path);

      const videoId = await uploadFile(videoFile.path, bucket);
      const thumbnailId = await uploadFile(thumbnailFile.path, bucket);
      let resourceId = null;

      if (resourceFile) {
        await checkFileAccess(resourceFile.path);
        resourceId = await uploadResourceFile(resourceFile.path, bucket);
      }

      // Find the week by weekNumber or create a new one if it doesn't exist
      let weekIndex = course.weeks.findIndex(
        (w) => w.weekNumber === parseInt(weekNumber)
      );
      if (weekIndex === -1) {
        const newWeek = { weekNumber: parseInt(weekNumber), videos: [] };
        course.weeks.push(newWeek);
        weekIndex = course.weeks.length - 1;
      }

      // Add video information to the week
      course.weeks[weekIndex].videos.push({
        title,
        description,
        thumbnail: thumbnailId,
        video: videoId,
        resource: resourceId,
      });

      await course.markModified("weeks");
      await course.save();

      res
        .status(200)
        .json({ message: "Video uploaded successfully!", videoId });
    } catch (err) {
      console.error("Error during video or thumbnail upload:", err);
      res.status(500).json({ error: "File upload error" });
    }
  } catch (err) {
    console.error("Error handling upload video to week:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadquiz = async (req, res) => {
  try {
    const { courseId, weekNumber, questions } = req.fields;

    if (!courseId || !questions) {
      return res
        .status(400)
        .json({ error: "Course ID and questions are required." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    let quiz = { questions: JSON.parse(questions) };

    if (weekNumber) {
      // Find the week by weekNumber or create a new one if it doesn't exist
      let weekIndex = course.weeks.findIndex(
        (w) => w.weekNumber === parseInt(weekNumber)
      );
      if (weekIndex === -1) {
        const newWeek = {
          weekNumber: parseInt(weekNumber),
          videos: [],
          quiz: quiz,
        };
        course.weeks.push(newWeek);
      } else {
        course.weeks[weekIndex].quiz = quiz;
      }
    } else {
      course.finalQuiz = quiz;
    }

    await course.markModified("weeks");
    await course.save();

    res.status(200).json({ message: "Quiz uploaded successfully!" });
  } catch (err) {
    console.error("Error handling upload quiz:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const databaseName = "ELearning"; // Replace with your database name
const bucketName = "uploads"; // Name of the GridFS bucket

const client = new MongoClient(uri);

exports.requestfile = async (req, res) => {
  try {
    // Ensure MongoDB connection is established
    if (!client.isConnected) {
      await client.connect();
    }

    const database = client.db(databaseName);
    const bucket = new GridFSBucket(database, { bucketName });

    // Extract fileId from request params or body
    const fileId = req.params.id || req.fields.fileId; // Use req.params.id for routes or req.fields.fileId for POST requests
    console.log("Extracted fileId:", fileId);

    // Validate the ObjectId
    if (!ObjectId.isValid(fileId)) {
      return res.status(400).send("Invalid ObjectId");
    }

    // Find the file in the GridFS bucket
    const file = await database
      .collection(`${bucketName}.files`)
      .findOne({ _id: new ObjectId(fileId) });

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Set content headers
    const contentType = file.contentType || "application/octet-stream";
    res.set("Content-Type", contentType);

    // Stream the file based on its content type
    const downloadStream = bucket.openDownloadStream(file._id);

    // Set additional headers if needed
    if (contentType === "application/pdf" || contentType.startsWith("image/")) {
      res.set("Content-Disposition", `inline; filename="${file.filename}"`);
    }

    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).send("An error occurred while streaming the file.");
    });

    downloadStream.on("end", () => {
      console.log(`Finished streaming file with ObjectId: ${fileId}`);
    });
  } catch (error) {
    console.error("Error handling file request:", error);
    res.status(500).send("An error occurred.");
  }
};

function checkFileAccess(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(`File not accessible at path: ${filePath}`, err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function uploadFile(filePath, bucket) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath); // Extract the file name
    const contentType = mime.lookup(filePath) || "application/octet-stream";
    const uploadStream = bucket.openUploadStream(fileName, {
      chunkSizeBytes: 1024 * 1024, // 1MB chunks
      contentType: contentType,
    });

    const readStream = fs.createReadStream(filePath);
    let bytesRead = 0;

    readStream
      .on("data", (chunk) => {
        bytesRead += chunk.length;
        console.log(
          `Reading ${chunk.length} bytes from ${fileName}. Total: ${bytesRead}`
        );
      })
      .on("error", (err) => {
        console.error(`Error with read stream for ${fileName}:`, err);
        reject(err);
      });

    uploadStream
      .on("finish", () => {
        console.log(`Upload finished for: ${fileName}`);
        resolve(uploadStream.id); // Return the file ID
      })
      .on("error", (err) => {
        console.error(`Error during upload for ${fileName}:`, err);
        reject(err);
      });

    readStream.pipe(uploadStream);
  });
}

function uploadResourceFile(filePath, bucket) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath); // Extract the file name
    const uploadStream = bucket.openUploadStream(fileName, {
      chunkSizeBytes: 1024 * 1024, // 1MB chunks
    });

    const readStream = fs.createReadStream(filePath);
    let bytesRead = 0;

    readStream
      .on("data", (chunk) => {
        bytesRead += chunk.length;
        console.log(
          `Reading ${chunk.length} bytes from ${fileName}. Total: ${bytesRead}`
        );
      })
      .on("error", (err) => {
        console.error(`Error with read stream for ${fileName}:`, err);
        reject(err);
      });

    uploadStream
      .on("finish", () => {
        console.log(`Upload finished for: ${fileName}`);
        resolve(uploadStream.id); // Return the file ID
      })
      .on("error", (err) => {
        console.error(`Error during upload for ${fileName}:`, err);
        reject(err);
      });

    readStream.pipe(uploadStream);
  });
}
