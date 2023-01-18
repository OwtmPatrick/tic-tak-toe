import * as express from "express";
import { Server } from "socket.io";
import users from "./store/Users";
import games from "./store/Games";
import { Events, Actions } from "./constants/socket";

import { Position } from "./entities/Game";

const { getUsers, checkUserName, addUser, removeUser } = users;
const { getGames, createGame } = games;

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

io.on(Events.CONNECTION, socket => {
  socket.on(Events.CHECK_USER_NAME, ({ name }, callback) => {
    const res = checkUserName({ name });

    if (res?.error) return callback(res?.error);

    callback();
  });

  socket.on(Events.ADD_USER, ({ name }, callback) => {
    const res = checkUserName({ name });

    if (res?.error) return callback(res?.error);

    addUser({ name, socketId: socket.id });

    io.emit(Actions.GET_USERS, {
      users: getUsers()
    });
  });

  socket.on(Events.LEAVE, () => {
    const user = removeUser(socket.id);

    console.log("user disconnected:", user?.name);

    io.emit(Actions.GET_USERS, {
      users: getUsers()
    });
  });

  socket.on(Events.DISCONNECT, () => {
    const user = removeUser(socket.id);

    console.log("user left:", user?.name);

    io.emit(Actions.GET_USERS, {
      users: getUsers()
    });
  });

  socket.on(Events.GET_ALL_GAMES, () => {
    io.emit(Actions.GET_GAMES, {
      games: getGames()
    });
  });

  socket.on(Events.CREATE_GAME, (player: { name: string; position: Position }) => {
    createGame(player);

    io.emit(Actions.GET_GAMES, {
      games: getGames()
    });
  });
});
