import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("ws://localhost:3000", {
  auth: {
    token: "json-web-token"
  }
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("message_from_server", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_from_server");
    };
  }, []);

  const sendPing = () => {
    socket.emit("message_from_client", "ping");
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}

export default App;
