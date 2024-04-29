import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  Button,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import UserContext from "../global/UserContext";

export default function AuthenticationForm({ type, setTabIndex }) {
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const authData = watch();

  const isRegister = type === "register";

  const onLogin = async () => {
    try {
      const user = {
        username: authData.username,
        password: authData.password,
      };

      const loggedInUser = await authService.login(user);
      setUser(loggedInUser);
      window.localStorage.setItem("user", JSON.stringify(loggedInUser.user));

      navigate("/main");
    } catch (error) {
      if (error.response.data.errors) {
        for (const [key, message] of Object.entries(
          error.response.data.errors
        )) {
          setError(key, { type: "manual", message: message });
        }
      } else {
        console.log(error);
      }
    }
  };

  const onRegister = async () => {
    try {
      const user = {
        name: authData.name,
        username: authData.username,
        password: authData.password,
        confirmPassword: authData.confirmPassword,
      };

      const savedUser = await authService.signup(user);
      setTabIndex(0);

      console.log(savedUser);
    } catch (error) {
      if (error.response.data.errors) {
        for (const [key, message] of Object.entries(
          error.response.data.errors
        )) {
          setError(key, { type: "manual", message: message });
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <VStack>
      {isRegister && (
        <FormControl isRequired isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="enter your name..."
            name="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
      )}

      <FormControl isRequired isInvalid={errors.username}>
        <FormLabel>Username</FormLabel>

        <Input
          placeholder="enter your username..."
          name="username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword.password ? "text" : "password"}
            autoComplete="new-password"
            placeholder="enter your password..."
            name="password"
            {...register("password", { required: "Password is required" })}
          />
          <InputRightElement w={"4rem"}>
            <Button
              onClick={() =>
                setShowPassword((prevstate) => ({
                  ...prevstate,
                  password: !prevstate.password,
                }))
              }
            >
              {showPassword.password ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      {isRegister && (
        <FormControl isRequired isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword.confirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="confirm your password..."
              name="confirmPassword"
              {...register("confirmPassword", {
                required: "ConfirmPassword is required",
              })}
            />
            <InputRightElement w={"4rem"}>
              <Button
                onClick={() =>
                  setShowPassword((prevstate) => ({
                    ...prevstate,
                    confirmPassword: !prevstate.confirmPassword,
                  }))
                }
              >
                {showPassword.confirmPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>
              {errors.confirmPassword.message}
            </FormErrorMessage>
          )}
        </FormControl>
      )}

      <Button
        onClick={handleSubmit(isRegister ? onRegister : onLogin)}
        w={"100%"}
      >
        {isRegister ? "Sign up" : "Login"}
      </Button>
    </VStack>
  );
}
