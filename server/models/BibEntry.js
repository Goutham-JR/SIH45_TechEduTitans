const mongoose = require('mongoose');

const bibEntrySchema = new mongoose.Schema({
  type: {
    type: String, // Entry type (e.g., ARTICLE, BOOK)
    required: true,
  },
  citationKey: {
    type: String, // Citation key (e.g., KNUTH1997)
    required: true,// Ensure unique citation keys
  },
  fields: {
    author: { type: String },
    title: { type: String },
    year: { type: String },
    publisher: { type: String },
    journal: { type: String },
    volume: { type: String },
    number: { type: String },
    pages: { type: String },
    edition: { type: String },
    address: { type: String },
    booktitle: { type: String },
    editor: { type: String },
    doi: { type: String },
    url: { type: String },
    note: { type: String },
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model
const BibEntry = mongoose.model('BibEntry', bibEntrySchema);
module.exports = BibEntry;
