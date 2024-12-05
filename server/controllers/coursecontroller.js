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
      userId,
      courseTitle,
      courseDescription,
      whatyouwilllearn,
      requirements,
    } = req.fields;

    // Parse `whatyouwilllearn` and `requirements` if they are stringified JSON
    const learnPoints =
      typeof whatyouwilllearn === "string" && whatyouwilllearn.startsWith("[")
        ? JSON.parse(whatyouwilllearn)
        : whatyouwilllearn.split(",").map((item) => item.trim());

    const courseRequirements =
      typeof requirements === "string" && requirements.startsWith("[")
        ? JSON.parse(requirements)
        : requirements.split(",").map((item) => item.trim());

    const newCourse = new Course({
      userId,
      title: courseTitle,
      description: courseDescription,
      learnPoints,
      requirements: courseRequirements,
    });

    console.log("New Course:", newCourse);
    await newCourse.save();

    res.status(201).json({
      message: "Course created successfully!",
      courseId: newCourse._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadtrailer = async (req, res) => {
  try {
    console.log(
      "Received POST request for /api/course/uploadTrailerWithThumbnail"
    );

    const { courseId } = req.fields;
    const trailer = req.files.trailer;
    const thumbnail = req.files.thumbnail;

    if (!courseId || !trailer || !thumbnail) {
      return res.status(400).json({
        error: "Course ID, trailer file, and thumbnail file are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const trailerMimeType = trailer.mimetype || "video/mp4";
    const thumbnailMimeType = thumbnail.mimetype || "image/jpeg";

    await mongoose.connect("mongodb://localhost:27017/ELearning", {});

    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });

    try {
      const trailerFileId = await uploadFile(
        trailer.path,
        bucket,
        trailerMimeType
      );
      const thumbnailFileId = await uploadFile(
        thumbnail.path,
        bucket,
        thumbnailMimeType
      );

      course.trailerId = trailerFileId;
      course.thumbnailtrailer = thumbnailFileId;
      await course.save();

      res.status(200).json({
        message: "Trailer and thumbnail uploaded successfully!",
        trailerId: trailerFileId,
        thumbnailId: thumbnailFileId,
      });
    } catch (err) {
      console.error("Error during file upload:", err);
      res.status(500).json({ error: "File upload error" });
    }
  } catch (err) {
    console.error("Error handling upload trailer with thumbnail:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadweeks = async (req, res) => {
  try {
    const { courseId, weekNumber, weekTitle, title, description, duration } =
      req.fields;
    const videoFile = req.files.video;
    const thumbnailFile = req.files.thumbnail;
    const resourceFile = req.files.resource;
    console.log(weekTitle);
    if (
      !courseId ||
      !weekNumber ||
      !weekTitle ||
      !title ||
      !description ||
      !videoFile ||
      !thumbnailFile ||
      !duration
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

      // Pass MIME type explicitly
      const videoId = await uploadFile(
        videoFile.path,
        bucket,
        videoFile.mimetype || "video/mp4"
      );
      const thumbnailId = await uploadFile(
        thumbnailFile.path,
        bucket,
        thumbnailFile.mimetype || "image/jpeg"
      );
      let resourceId = null;

      if (resourceFile) {
        await checkFileAccess(resourceFile.path);
        resourceId = await uploadFile(
          resourceFile.path,
          bucket,
          resourceFile.mimetype || "application/pdf"
        );
      }

      // Find the week by weekNumber or create a new one if it doesn't exist
      let weekIndex = course.weeks.findIndex(
        (w) => w.weekNumber === parseInt(weekNumber)
      );
      if (weekIndex === -1) {
        const newWeek = {
          weekNumber: parseInt(weekNumber),
          weekTitle,
          videos: [],
        };
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
        duration: parseFloat(duration),
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

const uploadFile = async (filePath, bucket, providedMimeType = null) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const contentType =
      providedMimeType || mime.lookup(filePath) || "application/octet-stream"; // Use provided MIME or fallback

    console.log(`Uploading: ${fileName}, Content-Type: ${contentType}`); // Log the MIME type

    const uploadStream = bucket.openUploadStream(fileName, {
      chunkSizeBytes: 1024 * 1024, // 1MB chunks
      contentType: contentType,
    });

    const readStream = fs.createReadStream(filePath);

    readStream.on("error", (err) => {
      console.error(`Error with read stream for ${fileName}:`, err);
      reject(err);
    });

    uploadStream
      .on("finish", () => {
        console.log(
          `Upload finished for: ${fileName}, Content-Type: ${contentType}`
        );
        resolve(uploadStream.id);
      })
      .on("error", (err) => {
        console.error(`Error during upload for ${fileName}:`, err);
        reject(err);
      });

    readStream.pipe(uploadStream);
  });
};

exports.seachcoursebyname = async (req, res) => {
  const query = req.query.query; // Get the search term from the query parameter
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const db = mongoose.connection.db; // Get the native MongoDB driver
    const collection = db.collection("courses"); // Replace with your collection name
    const results = await collection
      .find({ title: { $regex: query, $options: "i" } }) // Case-insensitive search
      .limit(10)
      .toArray();

    res.json(results); // Send the full course details
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    // Extract the course ID from the request parameters
    const { id } = req.params;

    // Fetch the course details from the database
    const course = await Course.findById(id);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Respond with the course details
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course details:", err);

    // Handle invalid IDs or server errors
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

exports.finalize = async (req, res) => {
  try {
    const { couseId, keywords, courselanguage, level } = req.body;
    console.log(couseId, keywords, courselanguage, level);

    const course = await Course.findById(couseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Split keywords by commas and trim whitespace
    course.keywords = keywords.split(",").map((keyword) => keyword.trim());
    course.language = courselanguage;
    course.level = level;
    course.status = "Not Reviewed";

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    console.error("Error fetching course details:", err);

    // Handle invalid IDs or server errors
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    res.status(500).json({ error: "Server error" });
  }
};
