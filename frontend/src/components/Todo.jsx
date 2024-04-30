import { HStack, Box, Tooltip, Text } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

export default function Todo({ todo }) {
  return (
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
          <span>
            <TbListDetails fill="white" size={"24px"} />
          </span>
        </Tooltip>
      </Box>
    </HStack>
  );
}
