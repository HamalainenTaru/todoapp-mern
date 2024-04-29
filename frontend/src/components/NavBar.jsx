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
import userContenxt from "../userContenxt";
import { useContext } from "react";

export default function NavBar() {
  const { user } = useContext(userContenxt);
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
      <Text fontSize={"xl"}>Welcome {user?.username}</Text>

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
            src={user?.profilePic}
          />
        </MenuButton>

        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuDivider />
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
