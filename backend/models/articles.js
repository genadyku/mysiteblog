const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  titleShort: String,
  slug: String,
  textf: String,
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
