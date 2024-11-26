const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

// GridFS storage configuration
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/ELearning',  // Your MongoDB URL
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname, // File will be saved with its original name
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
