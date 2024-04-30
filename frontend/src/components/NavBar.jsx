import {
  Box,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../global/UserContext";
import { useNavigate } from "react-router-dom";
import TodoContext from "../global/TodoContext";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const { todos } = useContext(TodoContext);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Box shadow={"lg"} rounded={"lg"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"10px 15px 10px 15px"}
        w={"100%"}
        maxW={{ base: "100%", lg: "1240px" }}
        mx={"auto"}
      >
        <Text fontSize={"xl"}>
          Welcome <span style={{ fontWeight: "bold" }}>{user.username}</span>
        </Text>

        <Menu>
          <MenuButton as={Button} bg={"white"}>
            <Avatar
              size={"sm"}
              cursor={"pointer"}
              name="test"
              src={user.profilePic}
            />
          </MenuButton>

          <MenuList>
            <MenuItem onClick={onOpen}>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text>
                <strong>Username: </strong>
                {user.username}
              </Text>
              <Text>
                <strong>Name: </strong>
                {user.name}
              </Text>

              <Text>
                <strong>Total todos: </strong>
                {todos.length}
              </Text>

              <Text>
                <strong>Pending todos: </strong>
                {todos.filter((todo) => !todo.complited).length}
              </Text>

              <Text>
                <strong>Complited todos: </strong>
                {todos.filter((todo) => todo.complited).length}
              </Text>

              {todos.length > 0 && (
                <>
                  {todos.length > 0 && (
                    <Text>
                      <strong>Progress:</strong>
                    </Text>
                  )}
                  <CircularProgress
                    value={
                      (todos.filter((todo) => todo.complited).length /
                        todos.length) *
                      100
                    }
                    color="green.400"
                  >
                    <CircularProgressLabel>{`${Math.round(
                      (todos.filter((todo) => todo.complited).length /
                        todos.length) *
                        100
                    )}%`}</CircularProgressLabel>
                  </CircularProgress>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
