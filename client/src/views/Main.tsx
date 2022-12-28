import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { User } from "../types";

const Main = () => {
  const [users, setUsers] = useState<User[]>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("getUsers");

    socket.on("roomData", data => {
      setUsers(data.users);
    });
  }, []);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
