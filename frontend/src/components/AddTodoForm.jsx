import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

import todoService from "../services/todo.service";
import { useContext } from "react";
import UserContext from "../global/UserContext";
import { useForm } from "react-hook-form";
import TodoContext from "../global/TodoContext";

export default function AddTodoForm() {
  const { user } = useContext(UserContext);
  const { todos, setTodos } = useContext(TodoContext);

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
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.log(error);
    }
    reset({ title: "", description: "" });
  };

  return (
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
    </Stack>
  );
}
