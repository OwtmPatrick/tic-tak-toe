// export const Actions = {
//   GET_USERS: "GET_USERS"
// } as const;

// export const Events = {
//   ADD_USER: "ADD_USER",
//   LEAVE: "LEAVE"
// } as const;

export const Actions = {
  GET_USERS: "GET_USERS",
  GET_GAMES: "GET_GAMES"
} as const;

export const Events = {
  // common
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  // user
  CHECK_USER_NAME: "CHECK_USER_NAME",
  ADD_USER: "ADD_USER",
  LEAVE: "LEAVE",

  // game
  GET_ALL_GAMES: "GET_GAMES",
  CREATE_GAME: "CREATE_GAME"
} as const;
