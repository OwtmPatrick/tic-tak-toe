import * as express from "express";
import { Server } from "socket.io";
import users from "./store/Users";

const { getUsers, checkUserName, addUser, removeUser } = users;

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
  socket.on("checkUserName", ({ name }, callback) => {
    const res = checkUserName({ name });

    if (res?.error) return callback(res?.error);

    callback();
  });

  socket.on("addUser", ({ name }, callback) => {
    const res = checkUserName({ name });

    if (res?.error) return callback(res?.error);

    addUser({ name, socketId: socket.id });

    io.emit("roomData", {
      users: getUsers()
    });
  });

  socket.on("leave", () => {
    const user = removeUser(socket.id);

    console.log("user disconnected:", user?.name);

    io.emit("roomData", {
      users: getUsers()
    });
  });

  socket.on("getUsers", () => {
    io.emit("roomData", {
      users: getUsers()
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    console.log("user left:", user?.name);

    console.log("users: ", getUsers());

    io.emit("roomData", {
      users: getUsers()
    });
  });
});
