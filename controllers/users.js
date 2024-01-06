"use strict";
const db = require("../dataBase/connection");

exports.getUsers = async (req, res, next) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM user");
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
      .query("SELECT * FROM user WHERE id = ?", [id]);
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    if (!req.body) throw "No form data found";

    const user = {
      id: req.body.id,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      nickname: req.body.nickname,
      email: req.body.email,
      picture: req.body.picture,
      Role_id: req.body.Role_id,
    };

    const [roleResult] = await db
      .promise()
      .query("SELECT * FROM role WHERE id = ?", [user.Role_id]);

    if (roleResult.length === 0) {
      throw "Invalid Role_id.";
    }

    await db.promise().query("INSERT INTO user SET ?", user);

    res.status(200).json({
      status: "success",
      message: "User added",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!req.body) throw "No form data found";

    const updatedUser = {
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      nickname: req.body.nickname,
      email: req.body.email,
      picture: req.body.picture,
      Role_id: req.body.Role_id,
    };

    const [roleResult] = await db
      .promise()
      .query("SELECT * FROM role WHERE id = ?", [updatedUser.Role_id]);

    if (roleResult.length === 0) {
      throw "Invalid Role_id.";
    }

    const [result] = await db
      .promise()
      .query("UPDATE user SET ? WHERE id = ?", [updatedUser, userId]);

    if (result.affectedRows === 0) {
      throw "User not found.";
    }

    res.status(200).json({
      status: "success",
      message: "User updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.promise().query("DELETE FROM user WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
