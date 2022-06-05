//importando express
const express = require("express");
//importando metodo router
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/task.controller");

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTaskById);

router.delete("/:id", deleteTaskById);

//exportar router
module.exports = router;
