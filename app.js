const express = require("express");
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

//parsear json
app.use(express.json());
//recibir parametros a traves de query
app.use(express.urlencoded({ extended: false }));

//Pagina de inicio, lista todas las tareas
app.get("/", async (req, res) => {
  try {
    const task = await Task.find({});
    return res.json({ task });
  } catch (err) {
    console.log(err);
  }
});

//muestra una tarea especifica
app.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.json({ task });
  } catch (err) {
    console.log(err);
  }
});

//Crea una nueva tarea
app.post("/new", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.redirect(`/${task._id}`);
  } catch (err) {
    console.log(err);
  }
});

//editar una tarea especifica
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.redirect(`/${id}`);
  } catch (err) {
    console.log(err);
  }
});

//eliminar una tarea especifica
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
