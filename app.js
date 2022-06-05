const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/task");
const morgan = require("morgan");
const pkg = require("./package.json");
//importanto las rutas
const taskRouter = require("./routes/task.routes");

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

app.use(morgan());

app.set("pkg", pkg);

//Pagina de inicio, lista todas las tareas
app.get("/", async (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/Task", taskRouter);

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
