import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function AddTodoForm() {
  return (
    <Stack
      spacing={4}
      direction={{ base: "column", md: "row" }}
      p={2}
      m={"20px 0 0 0"}
    >
      <FormControl>
        <InputGroup>
          <InputLeftAddon>Title</InputLeftAddon>
          <Input placeholder="Todo title..." />
        </InputGroup>
        <FormErrorMessage>Error Message</FormErrorMessage>
      </FormControl>
      <FormControl>
        <InputGroup>
          <InputLeftAddon>Desc</InputLeftAddon>
          <Input placeholder="Todo description..." />
        </InputGroup>
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
      <Button w={{ base: "100%", md: "200px" }} h={"100%"} p={2}>
        Add Todo
      </Button>
    </Stack>
  );
}
