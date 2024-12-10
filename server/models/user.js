const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    profilePhoto: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phoneNumber: { type: String },
    gender: { type: String, enum: ["male", "female", "other"], default: null },
    collegeName: { type: String, default: null },
    dob: { type: Date, default: null },
    skills: { type: [String], default: [], required: false },
    line1: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    pincode: { type: String, default: null },
    country: { type: String, default: "India" },
    role: { type: String, default: "Student" },
    status: { type: String, default: "Active" },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Account || mongoose.model("Account", userSchema);
