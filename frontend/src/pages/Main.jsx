import { Container } from "@chakra-ui/react";
import AddTodoForm from "../components/AddTodoForm";
import NavBar from "../components/NavBar";
import Todos from "../components/Todos";
import { useContext, useEffect } from "react";
import UserContext from "../global/UserContext";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <NavBar />
      <Container maxW={{ base: "100%", lg: "1140px" }} p={2}>
        <AddTodoForm />
        <Todos />
      </Container>
    </>
  );
}
