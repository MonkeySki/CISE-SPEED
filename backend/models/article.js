const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  journal_name: {
    type: String,
    required: true
  },
  volume_number: {
    type: String
  },
  year_of_publication: {
    type: String
  },
  pages: {
    type: String
  },
  doi: {
    type: String
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);