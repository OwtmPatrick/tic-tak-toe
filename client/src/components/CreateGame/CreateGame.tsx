import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  useDisclosure
} from "@chakra-ui/react";
import { Position } from "../../types";
import { SocketContext } from "../../context/SocketContext";

const CreateGame: React.FC<{}> = () => {
  const [position, setPosition] = useState<Position>();
  const socket = useContext(SocketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const choosePosition = (value: Position) => {
    setPosition(value);
  };

  const createGame = () => {
    try {
      const player = {
        name: localStorage.getItem("userName"),
        position
      };

      socket.emit("createGame", player);
    } catch (e) {
      console.error(`Error during creating game ${e}`);
    }

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Create game</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose the position you want to play to</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ButtonGroup spacing="25">
              <Button
                colorScheme={position === Position.CROSS ? "blue" : undefined}
                onClick={() => choosePosition(Position.CROSS)}
              >
                X
              </Button>
              <Button
                colorScheme={position === Position.ZERO ? "blue" : undefined}
                onClick={() => choosePosition(Position.ZERO)}
              >
                0
              </Button>
            </ButtonGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} disabled={!position} onClick={createGame}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGame;
