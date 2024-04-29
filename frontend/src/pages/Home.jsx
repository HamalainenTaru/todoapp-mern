import {
  Card,
  Stack,
  CardBody,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import AuthenticationForm from "../components/AuthenticationForm";
import { useState } from "react";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndex = (index) => {
    setTabIndex(index);
  };
  return (
    <Card
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="outline"
      shadow={"lg"}
      rounded={"lg"}
      m={{ base: "20px 0 0 0", lg: "60px 0 0 0" }}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", lg: "500px" }}
        src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Todo List"
      />

      <Stack>
        <CardBody>
          <Heading size="md">Welcome to Todo App</Heading>

          <Text py="2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            deserunt.
          </Text>

          <Tabs
            isFitted
            variant="enclosed"
            isLazy
            index={tabIndex}
            onChange={handleTabIndex}
          >
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AuthenticationForm type={"login"} />
              </TabPanel>
              <TabPanel>
                <AuthenticationForm
                  type={"register"}
                  setTabIndex={handleTabIndex}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Stack>
    </Card>
  );
}
