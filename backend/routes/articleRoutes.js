const express = require('express');
const articleControllers = require('../controllers/articleControllers');

const router = express.Router();
router.route('/articles').get(articleControllers.getArticles);
router.route('/article/:slug').get(articleControllers.getArticle);

module.exports = router;
