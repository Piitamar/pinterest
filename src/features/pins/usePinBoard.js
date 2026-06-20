import { useState } from "react";

export function usePinBoards() {
  const [selectedBoardsByPin, setSelectedBoardsByPin] = useState({});

  const selectBoardForPin = (pinId, board) => {
    setSelectedBoardsByPin((prev) => ({
      ...prev,
      [pinId]: board,
    }));
  };

  return {
    selectedBoardsByPin,
    selectBoardForPin,
  };
}