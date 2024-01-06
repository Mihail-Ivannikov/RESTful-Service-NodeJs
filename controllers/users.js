const db = require("../dataBase/connection");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) return next("error");
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
    if (err) return next("error");
    res.json(results[0]);
  });
};
exports.addUser = (req, res, next) => {
  if (!req.body) return next("No form data found");

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

  db.query("SELECT * FROM role WHERE id = ?", [user.Role_id], (err, result) => {
    if (err) return next("error");

    if (result.length === 0) {
      return next("Invalid Role_id.");
    }

    db.query("INSERT INTO user SET ?", user, (err, result) => {
      if (err) return next("error");

      res.status(200).json({
        status: "success",
        message: "User added",
      });
    });
  });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.id;

  if (!req.body) return next("No form data found");

  const updatedUser = {
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    email: req.body.email,
    picture: req.body.picture,
    Role_id: req.body.Role_id,
  };

  db.query(
    "SELECT * FROM role WHERE id = ?",
    [updatedUser.Role_id],
    (err, result) => {
      if (err) return next("error");

      if (result.length === 0) {
        return next("Invalid Role_id.");
      }

      db.query(
        "UPDATE user SET ? WHERE id = ?",
        [updatedUser, userId],
        (err, result) => {
          if (err) return next("error");

          if (result.affectedRows === 0) {
            return next("User not found.");
          }

          res.status(200).json({
            status: "success",
            message: "User updated",
          });
        }
      );
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM user WHERE id = ?", [id], (err) => {
    if (err) return next("error");
    res.json({ message: "User deleted successfully" });
  });
};
