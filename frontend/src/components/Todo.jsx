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
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import todoService from "../services/todo.service";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TodoContext from "../global/TodoContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [fullTodo, setFullTodo] = useState(null);

  const { register, handleSubmit, watch } = useForm();

  const toast = useToast();

  const editTodoData = watch();

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const onCloseDetailsModal = () => setIsOpenDetailsModal(false);
  const onCloseEditModal = () => setIsOpenEditModal(false);
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);

  const onTodoDetailsClick = async (id) => {
    const savedToken = localStorage.getItem("token");
    const fetchedTodo = await todoService.getTodoById(id, savedToken);
    setFullTodo(fetchedTodo);
    setIsOpenDetailsModal(true);
  };

  const onTodoStatusChange = async (id) => {
    const savedToken = localStorage.getItem("token");
    const updatedTodo = await todoService.updateTodoStatus(id, savedToken);
    setTodos(todos.map((todo) => (todo.id !== id ? todo : updatedTodo)));
    toast({
      title: "Status succesfully updated",
      description: `${todo.title}'s status has been updated`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onTodoDeleteClick = () => setIsOpenDeleteModal(true);

  const onTodoDelete = async (id) => {
    const savedToken = localStorage.getItem("token");

    try {
      await todoService.deleteTodo(id, savedToken);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast({
        title: "Todo succesfully removed",
        description: `${todo.title} is succesfully removed`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onUpdateTodo = async (id) => {
    console.log(editTodoData, id);
    const savedToken = localStorage.getItem("token");
    const newTodo = {
      title: editTodoData.title,
      description: editTodoData.description,
    };
    try {
      const result = await todoService.updateTodo(id, newTodo, savedToken);
      setTodos(todos.map((todo) => (todo.id !== id ? todo : result)));
      onCloseEditModal();
      toast({
        title: "Todo succesfully updated",
        description: `${todo.title} is succesfully updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <HStack
        bg={todo.complited ? "gray.300" : "gray.500"}
        shadow={"lg"}
        rounded={"lg"}
        flexDirection={{ base: "column", md: "row" }}
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

        <Box display={"flex"} alignItems={"center"} gap={{ base: 5, md: 3 }}>
          <Tooltip
            label={todo.complited ? "Mark uncompleted" : "Mark Completed"}
          >
            <span onClick={() => onTodoStatusChange(todo.id)}>
              {todo.complited ? (
                <FaTimes
                  fill={todo.complited ? "black" : "white"}
                  size={"24px"}
                />
              ) : (
                <FaCheck
                  fill={todo.complited ? "black" : "white"}
                  size={"24px"}
                />
              )}
            </span>
          </Tooltip>
          <Tooltip label="edit">
            <span onClick={() => setIsOpenEditModal(true)}>
              <FaRegEdit
                fill={todo.complited ? "black" : "white"}
                size={"24px"}
              />
            </span>
          </Tooltip>
          <Tooltip label="delete">
            <span onClick={onTodoDeleteClick}>
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

      <Modal
        isOpen={isOpenDetailsModal}
        onClose={onCloseDetailsModal}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Todo Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

      <Modal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder={todo.title} {...register("title")} />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder={todo.description}
                  {...register("description")}
                />
              </FormControl>

              <Button
                onClick={() => handleSubmit(onUpdateTodo(todo.id))}
                w={"100%"}
              >
                Update
              </Button>
              <Button w={"100%"}>Cancel</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Delete Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text>Are you sure you want to delete {todo.title}?</Text>
              <Button onClick={() => onTodoDelete(todo.id)} w={"100%"}>
                Confirm
              </Button>
              <Button onClick={onCloseDeleteModal} w={"100%"}>
                Cancel
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
