import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { Events } from "../constants/socket";

const socket = io("http://localhost:3000");
const SocketContext = createContext<Socket>(socket);

socket.on(Events.CONNECT, () => console.log("connected to socket"));
socket.on(Events.DISCONNECT, () => {});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
