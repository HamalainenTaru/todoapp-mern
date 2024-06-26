import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

const signup = async (user) => {
  const response = await axios.post(`${baseUrl}/signup`, user);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

export default { signup, login };
