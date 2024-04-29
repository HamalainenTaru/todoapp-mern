import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserContext from "./global/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user) {
        setUser(user);
        navigate("/main");
      }
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Container maxW={{ base: "100%", lg: "1140px" }} p={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Container>
    </UserContext.Provider>
  );
}
