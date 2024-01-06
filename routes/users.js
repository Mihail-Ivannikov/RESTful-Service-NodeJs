"use strict";
const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.route("/users").get(userController.getUsers);
router.route("/users/:id").get(userController.getById);
router.route("/users").post(userController.addUser);
router.route("/users/:id").put(userController.updateUser);
router.route("/users/:id").delete(userController.delete);

module.exports = router;
