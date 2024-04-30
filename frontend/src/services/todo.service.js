import axios from "axios";

const baseUrl = "http://localhost:3001/api/todo";

const getTodos = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getTodoById = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const createTodo = async (token, newTodo) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(baseUrl, newTodo, config);
  return response.data;
};

const updateTodoStatus = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.put(`${baseUrl}/${id}`, {}, config);
  return response.data;
};

const deleteTodo = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodoStatus,
  deleteTodo,
};
