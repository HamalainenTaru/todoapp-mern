import { Box } from "@chakra-ui/react";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import todoService from "../services/todo.service";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      const response = await todoService.getTodos(token);
      setTodos(response);
    };

    fetchTodos();
  }, []);

  return (
    <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      {/* <Todo /> */}
    </Box>
  );
}
