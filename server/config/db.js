const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let gfs; // Declare gfs globally

const connectDB = async () => {
  try {
    // Establish connection to MongoDB
    const conn = await mongoose.connect("mongodb://localhost:27017/ELearning", {
      
    });

    console.log("MongoDB connected successfully.");

    // Initialize GridFS after MongoDB connection is open
    const dbConn = mongoose.connection; // Get the default connection
    dbConn.once("open", () => {
      console.log("Initializing GridFS...");
      gfs = Grid(dbConn.db, mongoose.mongo);
      gfs.collection("uploads"); // Name of the collection for GridFS
      console.log("GridFS initialized successfully.");
    });

    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process on connection error
  }
};

// Function to get the GridFS instance
const getGFS = () => {
  if (!gfs) {
    throw new Error("GridFS is not initialized. Ensure the database is connected.");
  }
  return gfs;
};

module.exports = { connectDB, getGFS };
