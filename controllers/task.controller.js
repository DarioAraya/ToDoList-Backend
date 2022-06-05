const Task = require("../models/task");

module.exports.createTask = async (req, res, next) => {
  try {
    const { title, state } = req.body;

    const task = new Task({ title, state });

    const taskSaved = await task.save();

    res.status(201).json(taskSaved);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const task = await Task.find({});

    return res.json(task);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const taskUpdated = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(taskUpdated);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    console.log(err);
  }
};
