import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:3000");
const SocketContext = createContext<Socket>(socket);

socket.on("connect", () => console.log("connected to socket"));
socket.on("disconnect", () => {});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
