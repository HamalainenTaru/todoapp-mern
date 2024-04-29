import { Box } from "@chakra-ui/react";
import Todo from "./Todo";

export default function Todos() {
  return (
    <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
      <Todo />
    </Box>
  );
}
