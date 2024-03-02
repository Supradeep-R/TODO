const mongoose = require("mongoose");
const Todo = require("../models/TodoSchema");
const User = require("../models/UserSchema");
const router = require("express").Router();
const authenticateToken = require("../middleware");

// routes
router.post("/addTodo", authenticateToken, async (req, res) => {
  try {
    const { todo } = req.body;
    const userId = req.user.id;

    if (todo === null) {
      return res.status(400).send("Todo cant be empty");
    }
    const newTodo = new Todo({ todo, user: userId });
    await newTodo.save();

    // If you're using the todos field in the User schema, update the user document as well
    await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id } });

    res.json({ msg: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Couldnt add todo due to server issue ");
  }
});

// DELETE route to delete a todo
router.delete("/deleteTodo/:todoId", authenticateToken, async (req, res) => {
  try {
    const { todoId } = req.params;
    const userId = req.user.id;

    // First, find the todo to ensure it exists and belongs to the user
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send("Todo not found.");
    }

    // Check if the todo belongs to the user making the request
    if (todo.user.toString() !== userId) {
      return res.status(403).send("User not authorized to delete this todo.");
    }

    // Delete the todo
    await Todo.findByIdAndDelete(todoId);

    // Optionally, remove the todo ID from the user's todos array
    // Note: Only necessary if you're maintaining a list of todo IDs in the user document
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });

    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Could not delete todo due to server issue.");
  }
});

module.exports = router;
