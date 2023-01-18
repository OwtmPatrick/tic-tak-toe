export const Events = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  GET_USERS: "GET_USERS",
  GET_GAMES: "GET_GAMES"
} as const;

export const Actions = {
  // user
  CHECK_USER_NAME: "CHECK_USER_NAME",
  ADD_USER: "ADD_USER",
  LEAVE: "LEAVE",

  // game
  GET_ALL_GAMES: "GET_GAMES",
  CREATE_GAME: "CREATE_GAME"
} as const;
