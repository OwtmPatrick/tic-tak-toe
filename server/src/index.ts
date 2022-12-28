import * as express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(3000, () => {
  console.log("Application started on port 3000!");
});

const socketIo = new Server(server, {
  cors: {
    origin: "*" // Allow any origin for testing purposes. This should be changed on production.
  }
});

socketIo.on("connection", socket => {
  console.log("New connection created");

  // Get the auth token provided on handshake.
  const token = socket.handshake.auth.token;
  console.log("Auth token", token);

  try {
    // Verify the token here and get user info from JWT token.
  } catch (error) {
    socket.disconnect(true);
  }

  // A client is disconnected.
  socket.on("disconnect", () => {
    console.log("A user disconnected"); 
  });

  // Read message recieved from client.
  socket.on("message_from_client", data => {
    console.log("message_from_client: ", data);
  });

  // Send a message to the connected client 5 seconds after the connection is created.
  setTimeout(() => {
    socket.emit("message_from_server", `Message: ${Math.random()}`);
  }, 5_000);
});
