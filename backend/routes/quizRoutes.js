const express = require('express');
const { createQuiz, getAllQuiz } = require('../controller/quizController');

const router = express.Router();

router.route('/quiz/create').post(createQuiz);
router.route('/quiz/all').get(getAllQuiz);
module.exports = router;