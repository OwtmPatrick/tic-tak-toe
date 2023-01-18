import Game, { IGame, Player } from "../entities/Game";

const games: IGame[] = [];

const getGames = (): IGame[] => {
  return games;
};

const createGame = (player: Player): void => {
  const newGame = new Game(player);

  games.push(newGame);
};

export default { getGames, createGame };
