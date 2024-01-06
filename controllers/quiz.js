const db = require("../dataBase/connection");

exports.getQuizes = async (req, res, next) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM quiz");
    res.json({ Questions: results.length, results: results });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM quiz WHERE id = ?", [id]);
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
};

exports.addQuiz = async (req, res, next) => {
  try {
    if (!req.body) throw "No form data found";

    const quiz = {
      description: req.body.description,
      name: req.body.name,
    };

    await db.promise().query("INSERT INTO quiz SET ?", quiz);
    res.status(200).json({
      status: "success",
      message: "Quiz added",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateQuiz = async (req, res, next) => {
  const quizId = req.params.id;

  try {
    if (!req.body) throw "No form data found";

    const updatedQuiz = {
      description: req.body.description,
      name: req.body.name,
    };

    const [result] = await db
      .promise()
      .query("UPDATE quiz SET ? WHERE id = ?", [updatedQuiz, quizId]);

    if (result.affectedRows === 0) {
      throw "Quiz not found.";
    }

    res.status(200).json({
      status: "success",
      message: "Quiz updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM quiz WHERE id = ?", [id]);
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    next(err);
  }
};
