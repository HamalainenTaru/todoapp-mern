import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import userContenxt from "./userContenxt";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <userContenxt.Provider value={{ user, setUser }}>
      <Container maxW={{ base: "100%", lg: "1140px" }} p={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Container>
    </userContenxt.Provider>
  );
}
