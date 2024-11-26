const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs, gridfsBucket;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ELearning', {
      
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
      gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'uploads',
      });
      gfs = Grid(connection.db, mongoose.mongo);
      gfs.collection('uploads');
      console.log('MongoDB Connected and GridFS Initialized');
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB, gfs, gridfsBucket };
