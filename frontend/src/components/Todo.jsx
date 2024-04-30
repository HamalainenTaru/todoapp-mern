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
import { useState } from "react";

export default function Todo({ todo }) {
  const [fullTodo, setFullTodo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTodoClick = async (id) => {
    const savedToken = localStorage.getItem("token");
    const fetchedTodo = await todoService.getTodoById(id, savedToken);
    setFullTodo(fetchedTodo);
    onOpen();
  };

  return (
    <>
      <HStack
        bg={"teal.600"}
        shadow={"lg"}
        rounded={"lg"}
        p={4}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          overflow={"hidden"}
          color={"white"}
        >
          <Tooltip label="Todo title" placement="top-start">
            <Text isTruncated fontWeight={"bold"}>
              {todo.title}
            </Text>
          </Tooltip>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Tooltip label="edit">
            <span>
              <FaRegEdit fill="white" size={"24px"} />
            </span>
          </Tooltip>
          <Tooltip label="delete">
            <span>
              <MdDeleteOutline fill="white" size={"24px"} />
            </span>
          </Tooltip>

          <Tooltip label="view">
            <span onClick={() => onTodoClick(todo.id)}>
              <TbListDetails fill="white" size={"24px"} />
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
                  {fullTodo.completed ? "Complited" : "Pending"}
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
