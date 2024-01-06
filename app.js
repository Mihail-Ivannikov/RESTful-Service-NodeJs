"use strict";
const express = require("express");
const userRouter = require("./routes/users");
const quizRouter = require("./routes/quiz");
const questRouter = require("./routes/question");
const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(quizRouter);
app.use(questRouter);
app.all("*", (req, res, next) => {
  next(`The URL does not exists`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
