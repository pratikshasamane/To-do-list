const asyncHandler = require("express-async-handler");
const todo = require("../model/todoModel");

//get all todos
const getAllList = asyncHandler(async (req, res) => {
  const getAllList = await todo.find({ user_id: req.user.id });
  res.status(200).json(getAllList);
});

// Create
const createList = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const createTodo = await todo.create({
    title,
    description,
    user_id: req.user.id,
  });

  res
    .status(200)
    .json({ message: "Task created successfully", createdData: createTodo });
});

//update
const updateList = asyncHandler(async (req, res) => {
  const getById = await todo.findById(req.params.id);

  if (req.user.id !== getById.user_id.toString()) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }

  const updateTodo = await todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: "Task updated successfully", updatedData: updateTodo });
});

//delete
const deleteList = asyncHandler(async (req, res) => {
  const getById = await todo.findById(req.params.id);

  if (getById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to update another user user is "
    );
  }

  const deleteTodo = await todo.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: "Task deleted sucessfully", deletedData: deleteTodo });
});

module.exports = { createList, updateList, deleteList, getAllList };
