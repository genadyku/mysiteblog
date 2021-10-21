const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.ObjectId, ref: 'chapter' },
  num: String,
  slug: String,
  title: String,
  titleShort: String,
  textf: String,
});
const Lesson = mongoose.model('lesson', LessonSchema);
module.exports = Lesson;
