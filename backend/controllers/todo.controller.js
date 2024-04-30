const Todo = require("../models/todo.model");

/*
Method: GET
Path: /api/todo
Access: protected
*/
const getAllTodosByUser = async (request, response, next) => {
  try {
    const user = request.user;

    const todos = await Todo.findByUser(user._id);

    response.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

/*
Method: GET
Path: /api/todo/:id
Access: protected
*/
const getTodoById = async (request, response, next) => {
  try {
    const id = request.params.id;
    const todo = await Todo.findByID(id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    response.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

/*
Method: POST
Path: /api/todo
Access: protected
*/
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

/*
Method: DELETE
Path: /api/todo/delete/:id
Access: protected
*/
const deleteTodo = async (request, response, next) => {
  try {
    const id = request.params.id;
    const todo = await Todo.findByID(id);

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    await Todo.deleteTodo(todo.id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

/*
Method: PUT
Path: /api/todo/update/:id
Access: protected
*/
const updateTodo = async (request, response, next) => {};

/*
Method: PUT
Path: /api/todo/complete/:id
Access: protected
*/
const markTodoAsComplited = async (request, response, next) => {
  try {
    const id = request.params.id;

    const todo = await Todo.findByID(id);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    const updatedTodo = await Todo.updateTodoStatus(id);
    response.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodosByUser,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  markTodoAsComplited,
};
