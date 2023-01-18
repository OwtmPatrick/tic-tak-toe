import { v4 as uuidv4 } from "uuid";

export enum Position {
  CROSS = "CROSS",
  ZERO = "ZERO"
}

export type Player = {
  name: string;
  position: Position;
};

export interface IGame {
  id: string;
  players: Player[];
}

class Game implements IGame {
  id: string;
  players: Player[];

  constructor(player: Player) {
    this.players = [player];
    this.id = uuidv4();
  }
}

export default Game;
