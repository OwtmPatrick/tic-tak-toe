import React from "react";
import { Box } from "@chakra-ui/react";

import { User } from "../../types";

const Users: React.FC<{ users: User[] }> = ({ users }) => (
  <Box>
    Users:
    <ul>
      {users.map(user => (
        <li key={user.socketId}>{user.name}</li>
      ))}
    </ul>
  </Box>
);

export default Users;
