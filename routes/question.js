const express = require("express");
const questController = require("../controllers/question");
const router = express.Router();

router.route("/questions").get(questController.getQuest);
router.route("/questions/:id").get(questController.getById);
router.route("/questions").post(questController.addQuest);
router.route("/questions/:id").put(questController.updateQuest);
router.route("/questions/:id").delete(questController.delete);

module.exports = router;
