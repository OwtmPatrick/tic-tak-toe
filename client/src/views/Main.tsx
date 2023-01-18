import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Flex, Box, Button, Spacer } from "@chakra-ui/react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import Users from "../components/Users/Users";
import Games from "../components/Games/Games";

const Main: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const leave = () => {
    localStorage.removeItem("userName");
    navigate("/join");
  };

  useEffect(() => {
    socket.on("roomData", (data: { users: User[] }) => {
      setUsers(data.users);
    });

    if (userName) {
      socket.emit("addUser", { name: userName }, (e: string) => {
        if (e === "This name already exist") {
          leave();
        }
      });
    } else {
      leave();
    }
  }, []);

  const onLeave = (): void => {
    leave();
    socket.emit("leave", socket.id);
  };

  return (
    <Flex>
      <Box>
        <Flex>
          <Users users={users} />
          <Games />
        </Flex>
      </Box>
      <Spacer />
      <Box>
        <Button onClick={onLeave}>Leave</Button>
      </Box>
    </Flex>
  );
};

export default Main;
