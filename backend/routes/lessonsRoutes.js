const express = require('express');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.route('/chapter').get(lessonController.getChapters);
router.route('/chapter/:slug').get(lessonController.getChapterSlug);
router.route('/lessons').get(lessonController.getLessons);
router.route('/lesson/:slug').get(lessonController.getLesson);
router. route('/addlesson'). post(lessonController.addLesson);
module.exports = router;
