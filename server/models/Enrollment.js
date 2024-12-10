const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "completed", "canceled"],
      default: "active",
    },
  },
  {
    timestamps: true, 
  }
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

module.exports = Enrollment;
