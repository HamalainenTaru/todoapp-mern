const Todo = require("../models/todo.model");

/*
Path: /api/todo
Access: protected
*/
const test = (request, response) => {
  response.send(request.user);
};

const getAllTodosByUser = async (request, response, next) => {
  try {
    const user = request.user;

    const todos = await Todo.findByUser(user._id);

    response.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (request, response, next) => {};

const createTodo = async (request, response, next) => {
  try {
    const { title, description } = request.body;
    const user = request.user;

    const newTodo = {
      title,
      description,
      user: user.id,
    };
    const savedTodo = await Todo.create(newTodo);
    response.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (request, response, next) => {};

const updateTodo = async (request, response, next) => {};

const markTodoAsComplited = async (request, response, next) => {};

module.exports = {
  test,
  getAllTodosByUser,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  markTodoAsComplited,
};
