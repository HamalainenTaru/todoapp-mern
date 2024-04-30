import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import todoService from "../services/todo.service";
import { useContext, useState } from "react";
import UserContext from "../global/UserContext";
import { useForm } from "react-hook-form";
import TodoContext from "../global/TodoContext";

export default function AddTodoForm() {
  const { user } = useContext(UserContext);
  const { todos, setTodos } = useContext(TodoContext);
  const [show, setShow] = useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const todoData = watch();

  const onSubmit = async () => {
    const newTodo = {
      title: todoData.title,
      description: todoData.description,
      user: user.id,
    };

    try {
      const token = localStorage.getItem("token");
      const addedTodo = await todoService.createTodo(token, newTodo);
      setTodos(
        [...todos, addedTodo].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setShow(false);
      toast({
        title: "Todo succesfully created",
        description: `${addedTodo.title} succesfully created`,
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
    reset({ title: "", description: "" });
  };

  return (
    <>
      {show && (
        <Stack
          spacing={4}
          direction={{ base: "column", md: "row" }}
          p={2}
          m={"20px 0 0 0"}
        >
          <FormControl isRequired isInvalid={errors.title}>
            <InputGroup>
              <InputLeftAddon>
                <FormLabel>Title</FormLabel>
              </InputLeftAddon>
              <Input
                placeholder="Todo title..."
                {...register("title", { required: "Title is required" })}
              />
            </InputGroup>
            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftAddon>
                <FormLabel>Desc</FormLabel>
              </InputLeftAddon>
              <Input
                placeholder="Todo description..."
                {...register("description")}
              />
            </InputGroup>
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>
          <Button
            onClick={handleSubmit(onSubmit)}
            w={{ base: "100%", md: "200px" }}
            h={"100%"}
            p={2}
          >
            Add Todo
          </Button>
          <Button onClick={() => setShow(false)}>X</Button>
        </Stack>
      )}
      {!show && <Button onClick={() => setShow(true)}>Add new Todo</Button>}
    </>
  );
}
