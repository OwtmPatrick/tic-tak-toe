export type User = {
  socketId: string;
  name: string;
};

export enum Position {
  CROSS = "CROSS",
  ZERO = "ZERO"
}

export type Player = {
  name: string;
  position: Position;
};

export type Game = {
  id: string;
  players: Player[];
};
