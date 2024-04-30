import axios from "axios";

const baseUrl = "http://localhost:3001/api/todo";

const getTodos = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getTodos };
