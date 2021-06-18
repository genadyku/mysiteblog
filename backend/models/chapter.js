const mongoose = require('mongoose');

const ChapterSchema = mongoose.Schema({
  chapter1: String,
  title: String,
  slug: String,
  textf: String,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }],
});

const Chapter = mongoose.model('chapter', ChapterSchema);
module.exports = Chapter;
