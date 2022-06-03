const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/task");

mongoose.connect("mongodb://localhost:27017/to-do-list");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const task = await Task.find({});
    return res.json({ task });
  } catch (err) {
    console.log(err);
  }
});

app.get("/makeTask", async (req, res) => {
  const task = new Task({
    title: "Programar esta pagina",
    state: "en progreso",
  });
  await task.save();
  res.send(task);
});

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
