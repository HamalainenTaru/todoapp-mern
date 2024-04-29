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
} from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../global/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"10px 15px 10px 15px"}
      w={"100%"}
      shadow={"lg"}
      rounded={"lg"}
    >
      <Text fontSize={"xl"}>
        Welcome <span style={{ fontWeight: "bold" }}>{user.username}</span>
      </Text>

      <Menu>
        <MenuButton
          as={Button}
          bg={"white"}
          // rightIcon={<BiSolidChevronDown />}
        >
          <Avatar
            size={"sm"}
            cursor={"pointer"}
            name="test"
            src={user.profilePic}
          />
        </MenuButton>

        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
