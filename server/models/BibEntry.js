const mongoose = require('mongoose');

const BibEntrySchema = new mongoose.Schema({
  citationKey: String,
  entryType: String,
  entryTags: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('BibEntry', BibEntrySchema);
