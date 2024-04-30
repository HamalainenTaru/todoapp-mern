import {
  HStack,
  Box,
  Tooltip,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import todoService from "../services/todo.service";
import { useContext, useState } from "react";
import TodoContext from "../global/TodoContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [fullTodo, setFullTodo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTodoDetailsClick = async (id) => {
    const savedToken = localStorage.getItem("token");
    const fetchedTodo = await todoService.getTodoById(id, savedToken);
    setFullTodo(fetchedTodo);
    onOpen();
  };

  const onTodoStatusChange = async (id) => {
    const savedToken = localStorage.getItem("token");

    const updatedTodo = await todoService.updateTodoStatus(id, savedToken);
    console.log(updatedTodo);
    setTodos(todos.map((todo) => (todo.id !== id ? todo : updatedTodo)));
  };

  return (
    <>
      <HStack
        bg={todo.complited ? "gray.300" : "gray.500"}
        shadow={"lg"}
        rounded={"lg"}
        p={4}
        justifyContent={"space-between"}
        opacity={todo.complited ? "50%" : "100%"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          overflow={"hidden"}
          color={todo.complited ? "black" : "white"}
        >
          <Tooltip label="Todo title" placement="top-start">
            <Text
              isTruncated
              fontWeight={"bold"}
              textDecoration={todo.complited ? "line-through" : "none"}
            >
              {todo.title}
            </Text>
          </Tooltip>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Tooltip label={todo.complited ? "UnComplete" : "Complete"}>
            <span onClick={() => onTodoStatusChange(todo.id)}>
              <FaRegEdit
                fill={todo.complited ? "black" : "white"}
                size={"24px"}
              />
            </span>
          </Tooltip>
          <Tooltip label="edit">
            <span>
              <FaRegEdit
                fill={todo.complited ? "black" : "white"}
                size={"24px"}
              />
            </span>
          </Tooltip>
          <Tooltip label="delete">
            <span>
              <MdDeleteOutline
                fill={todo.complited ? "black" : "white"}
                size={"24px"}
              />
            </span>
          </Tooltip>

          <Tooltip label="view">
            <span onClick={() => onTodoDetailsClick(todo.id)}>
              <TbListDetails
                fill={todo.complited ? "black" : "white"}
                size={"24px"}
              />
            </span>
          </Tooltip>
        </Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Todo Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display the full todo details here */}
            {fullTodo && (
              <>
                <Text>
                  <strong>Title: </strong> {fullTodo.title}
                </Text>
                <Text>
                  <strong>Description: </strong> {fullTodo.description}
                </Text>
                <Text>
                  <strong>Status: </strong>
                  {fullTodo.complited ? "Completed" : "Pending"}
                </Text>
                <Text>
                  <strong>User: </strong>
                  {fullTodo.user.username}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
