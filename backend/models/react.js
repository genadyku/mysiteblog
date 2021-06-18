const mongoose = require('mongoose');

const ReactSchema = new mongoose.Schema({
  title: String,
  titleShort: String,
  slug: String,
  textf: String,
});

const ReactArticle = mongoose.model('ReactArticle', ReactSchema);

module.exports = ReactArticle;
