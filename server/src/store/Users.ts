import { User } from "../types";

const users: User[] = [];

const getUsers = () => {
  return users;
};

const checkUserName = ({ name }: Partial<User>) => {
  const existingUser = users.find(user => user.name === name);

  if (existingUser) {
    return { error: "This name already exist" };
  }
};

const addUser = ({ name, socketId }: User) => {
  const newUser = { name, socketId };

  users.push(newUser);
};

const removeUser = (socketId: string) => {
  const index = users.findIndex(user => user.socketId === socketId);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  console.log(users);
};

export default { getUsers, checkUserName, addUser, removeUser };
