import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Flex, Box, Button, Spacer } from "@chakra-ui/react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    socket.on("roomData", (data: { users: User[] }) => {
      console.log("get users");
      setUsers(data.users);
    });

    if (userName) {
      socket.emit("addUser", { name: userName });
    } else {
      localStorage.removeItem("userName");
      navigate("/join");
    }
  }, []);

  const onLeave = (): void => {
    localStorage.removeItem("userName");
    navigate("/join");

    socket.emit("leave", socket.id);
  };

  return (
    <Flex>
      <Box>
        <Box>
          Users:
          <ul>
            {users.map(user => (
              <li key={user.socketId}>{user.name}</li>
            ))}
          </ul>
        </Box>
        <Box>Games:</Box>
      </Box>
      <Spacer />
      <Box>
        <Button onClick={onLeave}>Leave</Button>
      </Box>
    </Flex>
  );
};

export default Main;
