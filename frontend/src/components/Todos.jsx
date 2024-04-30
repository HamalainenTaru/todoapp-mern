import { Box } from "@chakra-ui/react";
import Todo from "./Todo";
import { useContext, useEffect } from "react";
import todoService from "../services/todo.service";
import TodoContext from "../global/TodoContext";

export default function Todos() {
  const { todos, setTodos } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      const response = await todoService.getTodos(token);
      setTodos(response);
    };

    fetchTodos();
  }, [setTodos]);

  return (
    <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </Box>
  );
}
