import React, { useEffect, useContext, useState } from "react";
import { Box } from "@chakra-ui/react";

import { Game } from "../../types";
import { SocketContext } from "../../context/SocketContext";
import CreateGame from "../CreateGame/CreateGame";
import { Actions, Events } from "../../constants/socket";

const Games: React.FC<{}> = () => {
  const [games, setGames] = useState<Game[]>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit(Actions.GET_ALL_GAMES);
    socket.on(Events.GET_GAMES, ({ games: data }: { games: Game[] }) => {
      setGames(data);
    });
  }, []);

  return (
    <Box>
      <Box>Games:</Box>

      <ul>
        {games.map(game => (
          <li key={game.id} style={{ border: "1px solid" }}>
            players:{" "}
            {game.players.map(player => (
              <React.Fragment key={player.position}>
                <span>{player.name}</span>
                <span>{player.position}</span>
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>

      <CreateGame />
    </Box>
  );
};

export default Games;
