import { Box } from "@chakra-ui/react";
import AddTodoForm from "../components/AddTodoForm";
import NavBar from "../components/NavBar";
import Todos from "../components/Todos";

export default function Main() {
  return (
    <Box>
      <NavBar />
      <AddTodoForm />
      <Todos />
    </Box>
  );
}
