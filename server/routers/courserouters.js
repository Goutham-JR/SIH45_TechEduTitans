const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const courseController = require("../controllers/coursecontroller");

// Utility function to dynamically generate fields for multer
function generateUploadFields(data) {
  const fields = [];

  // Add field for trailer
  fields.push({ name: "trailer", maxCount: 1 });

  // Add fields for weeks and videos
  if (data.weeks) {
    data.weeks.forEach((week, weekIndex) => {
      week.videos.forEach((video, videoIndex) => {
        fields.push({ name: `video-week${weekIndex}-video${videoIndex}`, maxCount: 1 });
        fields.push({ name: `thumbnail-week${weekIndex}-video${videoIndex}`, maxCount: 1 });
        fields.push({ name: `resource-week${weekIndex}-video${videoIndex}`, maxCount: 1 });
      });
    });
  }

  return fields;
}

// Middleware to dynamically configure multer fields
const dynamicUpload = (req, res, next) => {
    try {
      console.log("Received body:", req.body);  // Log the entire body
  
      if (!req.body.data) {
        return res.status(400).json({ error: "Missing 'data' field in request body" });
      }
  
      const { weeks } = JSON.parse(req.body.data);  // Parse the JSON inside `data`
      console.log("Parsed weeks:", weeks);
  
      const uploadFields = generateUploadFields({ weeks });
      const dynamicUploader = upload.fields(uploadFields);
  
      dynamicUploader(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: "File upload failed", details: err });
        }
        next();
      });
    } catch (error) {
      console.error("Error parsing data:", error);
      res.status(400).json({ error: "Invalid data structure", details: error.message });
    }
  };
  
// Route to create a course (handles dynamic file uploads)
router.post("/create", dynamicUpload, courseController.createCourse);

// Route to fetch video by ID
router.get("/video/:id", courseController.getVideo);

module.exports = router;
