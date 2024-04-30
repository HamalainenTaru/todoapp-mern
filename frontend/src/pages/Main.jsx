import { Container } from "@chakra-ui/react";
import AddTodoForm from "../components/AddTodoForm";
import NavBar from "../components/NavBar";
import Todos from "../components/Todos";
import { useContext, useEffect, useState } from "react";
import UserContext from "../global/UserContext";
import { useNavigate } from "react-router-dom";
import TodoContext from "../global/TodoContext";

export default function Main() {
  const { user } = useContext(UserContext);

  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <NavBar />
        <Container maxW={{ base: "100%", lg: "1140px" }} p={2}>
          <AddTodoForm />
          <Todos />
        </Container>
      </TodoContext.Provider>
    </>
  );
}
