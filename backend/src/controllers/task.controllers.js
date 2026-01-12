import Task from "../model/task.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const addTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Task added successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add task" });
  }
};

const updateTask = async (req, res) => {
  const allowedFields = ["title", "description", "status", "type"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};


const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  if (!["completed", "incompleted"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: { status } },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

export { getTasks, addTask, updateTask, updateTaskStatus, deleteTask };
