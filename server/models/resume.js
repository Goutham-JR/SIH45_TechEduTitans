const mongoose = require('mongoose');

const resumeschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    keywords: { type: [String]},
})

const Resume = mongoose.model("Resume", resumeschema);

module.exports = Resume;