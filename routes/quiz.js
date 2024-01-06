"use strict";
const express = require("express");
const quizController = require("../controllers/quiz");
const router = express.Router();

router.route("/quiz").get(quizController.getQuizes);
router.route("/quiz/:id").get(quizController.getById);
router.route("/quiz").post(quizController.addQuiz);
router.route("/quiz/:id").put(quizController.updateQuiz);
router.route("/quiz/:id").delete(quizController.delete);

module.exports = router;
