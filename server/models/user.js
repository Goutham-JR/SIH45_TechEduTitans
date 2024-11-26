const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetOtp: { type: String }, // OTP for password reset
    resetOtpExpires: { type: Date }, // Expiration time for the OTP
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Account', userSchema);
