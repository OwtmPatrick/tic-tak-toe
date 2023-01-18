import React, { useState, useContext } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { Actions } from "../constants/socket";
import { Navigation } from "../constants/navigation";
import { LocalStorage } from "../constants/localStorage";

const Join: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const socket = useContext(SocketContext);
  const isError = name === "" || !!error;
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const onJoin = () => {
    socket.emit(Actions.CHECK_USER_NAME, { name }, (e: string) => {
      if (e) {
        setError(e);
        return;
      }

      localStorage.setItem(LocalStorage.USERNAME_KEY, name!);
      navigate(Navigation.MAIN);
    });
  };

  return (
    <form>
      <FormControl isInvalid={isError}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name || ""}
          onChange={handleInputChange}
          placeholder="Please enter your name"
        />
        {name === "" && <FormErrorMessage>Name is required</FormErrorMessage>}
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>

      <Button onClick={onJoin}>Join</Button>
    </form>
  );
};

export default Join;
