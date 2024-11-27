const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// GridFS Storage Configuration
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/ELearning",
  
  file: (req, file) => {
    const match = ["video/mp4", "image/jpeg", "image/png", "application/pdf"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }

    return {
      bucketName: "uploads", // Bucket name in MongoDB
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
