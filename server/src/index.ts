import * as express from "express";
import { Server } from "socket.io";
import users from "./store/Users";

const { getUsers, addUser, removeUser } = users;

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173"
  }
});

io.on("connection", socket => {
  socket.on("join", ({ name }, callback) => {
    const { error } = addUser({ id: socket.id, name });

    if (error) return callback(error);

    io.emit("roomData", {
      users: getUsers()
    });
    callback();
  });

  socket.on("getUsers", () => {
    io.emit("roomData", {
      users: getUsers()
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    console.log(user);

    io.emit("roomData", {
      users: getUsers()
    });
  });
});
