import { User } from "../types";

const users: User[] = [];

const getUsers = () => {
  return users;
};

const addUser = ({ id, name }: User) => {
  const existingUser = users.find(user => user.name === name);

  if (existingUser) {
    return { error: "This name already exist" };
  }

  const newUser = { id, name };

  users.push(newUser);
  return { newUser };
};

const removeUser = (id: string) => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export default { getUsers, addUser, removeUser };
