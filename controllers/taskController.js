const tasks = require("../models/taskModel"); // Make sure this is tasks, not task

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Assuming `tasks` is an array of task objects
    res.status(200).json({ message: "Tasks retrieved successfully", data: tasks });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id); // Correct variable name: tasks
    if (task) {
      res.status(200).json({ message: "Task retrieved successfully", data: task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Helper function to generate a new task ID (auto-increment)
const generateTaskId = () => {
  if (tasks.length === 0) {
    return 1; // Start from 1 if there are no tasks
  }
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1; // Increment the highest ID
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const { task, status } = req.body;
    if (!task || !status) {
      return res.status(400).json({ message: "'task' and 'status' are required" });
    }

    // Create new task object
    const newTask = {
      id: generateTaskId(),  // Use the generateTaskId function to create an incrementing ID
      task,                  // Task name from request body
      status,                // Status from request body
    };

    tasks.push(newTask);  // Add the new task to the tasks array

    res.status(201).json({ message: "Task added successfully", data: newTask });  // Send the newly added task
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id); // Find index of the task
    if (index !== -1) {
      // Merge the existing task with updated fields
      tasks[index] = { ...tasks[index], ...req.body };  // Update task with new data
      res.status(200).json({ message: "Task updated successfully", data: tasks[index] });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id); // Find index of the task
    if (index !== -1) {
      tasks.splice(index, 1); // Remove the task from the array
      res.status(200).json({ message: "Task deleted successfully", data: tasks });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
