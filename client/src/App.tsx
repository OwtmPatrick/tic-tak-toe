import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </SocketProvider>
  );
}

export default App;
