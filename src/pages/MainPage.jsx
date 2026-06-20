import { useState } from "react";
import { usePins } from "../features/pins/usePins.js";
import { usePinBoards } from "../features/pins/usePinBoard.js";
import ImageCard from "../features/pins/ImageCard.jsx";
import TopicSlider from "../components/TopicSlider.jsx";
import BoardSavePortal from "../features/boards/BoardSavePortal.jsx";

export default function MainPage() {
  const pinData = usePins();
  const {
    selectedBoardsByPin,
    selectBoardForPin,
  } = usePinBoards();

  const [portal, setPortal] = useState({
    open: false,
    activePin: null,
  });

  const onOpenBoardMenu = (e, item) => {
    e.preventDefault();
    setPortal({ open: true, activePin: item });
  };

  const handleSelectBoard = (board) => {
    if (!portal.activePin) return;

    selectBoardForPin(portal.activePin.id, board);

    setPortal({ open: false, activePin: null });
  };

  const closePortal = () => {
    setPortal({ open: false, activePin: null });
  };

  return (
    <>
      <section className="relative z-0 ml-[7vw] w-[92vw] bg-white">
        <TopicSlider />
      </section>

      <main className="relative z-0 ml-[7vw] grid min-h-[85vh] w-[92vw] grid-cols-1 gap-4 bg-white px-4 pt-4 [grid-auto-rows:5px] [grid-auto-flow:dense] sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {pinData.map((item) => {
          const selectedBoard = selectedBoardsByPin[item.id] || null;

          return (
            <ImageCard
              key={item.id}
              item={item}
              onOpenBoardMenu={onOpenBoardMenu}
              boardChosen={selectedBoard}
              selectedBoardName={selectedBoard?.name || ""}
            />
          );
        })}
      </main>

      <div id="mainpage-portal-root" />

      <BoardSavePortal
        isPortalOpen={portal.open}
        onClose={closePortal}
        boardChosen={portal.activePin ? selectedBoardsByPin[portal.activePin.id] || null : null}
        setSelectedBoard={handleSelectBoard}
      />
    </>
  );
}
