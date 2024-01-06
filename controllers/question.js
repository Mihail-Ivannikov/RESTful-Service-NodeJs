const db = require("../dataBase/connection");

exports.getQuest = (req, res) => {
  db.query("SELECT * FROM question", (err, results) => {
    if (err) return next("error");
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM question WHERE id = ?", [id], (err, results) => {
    if (err) return next("error");
    res.json(results[0]);
  });
};

exports.addQuest = (req, res, next) => {
  if (!req.body) return next("No form data found");
  const quiz = {
    id: req.body.id,
    type: req.body.type,
    number: req.body.number,
    description: req.body.description,
    Quiz_id: req.body.Quiz_id,
  };

  db.query("INSERT INTO question SET ?", quiz, (err, result) => {
    if (err) return next("error");
    res.status(200).json({
      status: "success",
      message: "Question added",
    });
  });
};

exports.updateQuest = (req, res, next) => {
  const questId = req.params.id;

  if (!req.body) return next("No form data found");

  const updatedQuest = {
    id: req.body.id,
    type: req.body.type,
    number: req.body.number,
    description: req.body.description,
    Quiz_id: req.body.Quiz_id,
  };
  db.query(
    "UPDATE question SET ? WHERE id = ?",
    [updatedQuest, questId],
    (err, result) => {
      if (err) return next("error");
      if (result.affectedRows === 0) {
        return next("Question not found.");
      }
      res.status(200).json({
        status: "success",
        message: "Question updated",
      });
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM question WHERE id = ?", [id], (err) => {
    if (err) return next("error");
    res.json({ message: "Question deleted successfully" });
  });
};
