const express = require('express');
const reactControlers = require('../controllers/reactControlers');
const authController = require('../controllers/authControler');

const router = express.Router();

//router.route('/reacts').get(reactControlers.getArticles);

router
  .route('/reacts')
  .get(authController.protect, reactControlers.getArticles);
router
  .route('/react/:slug')
  .get(authController.protect, reactControlers.getArticle);

module.exports = router;
