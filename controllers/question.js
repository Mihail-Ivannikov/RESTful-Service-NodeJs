"use strict";
const db = require("../dataBase/connection");

exports.getQuest = async (req, res, next) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM question");
    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM question WHERE id = ?", [id]);
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
};

exports.addQuest = async (req, res, next) => {
  try {
    if (!req.body) throw "No form data found";

    const quiz = {
      id: req.body.id,
      type: req.body.type,
      number: req.body.number,
      description: req.body.description,
      Quiz_id: req.body.Quiz_id,
    };

    await db.promise().query("INSERT INTO question SET ?", quiz);
    res.status(200).json({
      status: "success",
      message: "Question added",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateQuest = async (req, res, next) => {
  const questId = req.params.id;

  try {
    if (!req.body) throw "No form data found";

    const updatedQuest = {
      id: req.body.id,
      type: req.body.type,
      number: req.body.number,
      description: req.body.description,
      Quiz_id: req.body.Quiz_id,
    };

    const [result] = await db
      .promise()
      .query("UPDATE question SET ? WHERE id = ?", [updatedQuest, questId]);

    if (result.affectedRows === 0) {
      throw "Question not found.";
    }

    res.status(200).json({
      status: "success",
      message: "Question updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM question WHERE id = ?", [id]);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    next(err);
  }
};
