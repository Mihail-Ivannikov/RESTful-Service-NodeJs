const db = require("../dataBase/connection");

exports.getQuizes = (req, res) => {
  db.query("SELECT * FROM quiz", (err, results, fields) => {
    if (err) return next("error");
    res.json({ Questions: results.length, results: results });
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM quiz WHERE id = ?", [id], (err, results) => {
    if (err) return next("error");
    res.json(results[0]);
  });
};

exports.addQuiz = (req, res, next) => {
  if (!req.body) return next("No form data found");
  const quiz = {
    description: req.body.description,
    name: req.body.name,
  };
  db.query("INSERT INTO quiz SET ?", quiz, (err, result) => {
    if (err) return next("error");
    res.status(200).json({
      status: "success",
      message: "Quiz added",
    });
  });
};

exports.updateQuiz = (req, res, next) => {
  const quizId = req.params.id;

  if (!req.body) return next("No form data found");

  const updatedQuiz = {
    description: req.body.description,
    name: req.body.name,
  };
  db.query(
    "UPDATE quiz SET ? WHERE id = ?",
    [updatedQuiz, quizId],
    (err, result) => {
      if (err) return next("error");
      if (result.affectedRows === 0) {
        return next("Quiz not found.");
      }
      res.status(200).json({
        status: "success",
        message: "Quiz updated",
      });
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM quiz WHERE id = ?", [id], (err) => {
    if (err) return next("error");
    res.json({ message: "Quiz deleted successfully" });
  });
};
