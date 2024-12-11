const mongoose = require('mongoose');

const resumeschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    file: { type: String },
    keywords: { type: [String]},
})