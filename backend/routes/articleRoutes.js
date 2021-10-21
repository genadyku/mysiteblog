const express = require('express');
const articleControllers = require('../controllers/articleControllers');

const router = express.Router();
router.route('/articles').get(articleControllers.getArticles);
router.route('/article/:slug').get(articleControllers.getArticle);
router.route('/addarticle').post(articleControllers.addArticle);
router.route('/deleteArticle/:id').post(articleControllers.deleteArticle);
router.route('/updatearticle/:id').put(articleControllers.updateArticle);


module.exports = router;
