import { useCallback, useEffect, useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { savePin } from "./apiPins";

export default function ImageCard({
  item,
  onOpenBoardMenu,
  selectedBoardName,
  boardChosen,
}) {
  const [saved, setSaved] = useState(false);
  const [span, setSpan] = useState(1);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const rowHeight = 10;
  const rowGap = 16;

  const calculateSpan = useCallback(() => {
    const card = cardRef.current;
    const img = imgRef.current;

    if (!card || !img) return;

    const naturalWidth = item.width || img.naturalWidth;
    const naturalHeight = item.height || img.naturalHeight;

    if (!naturalWidth || !naturalHeight) return;

    const cardWidth = card.getBoundingClientRect().width;
    const renderedHeight = cardWidth * (naturalHeight / naturalWidth);
    const gridSpan = Math.ceil((renderedHeight + rowGap) / (rowHeight + rowGap));

    setSpan(gridSpan);
  }, [item.height, item.width]);

  useEffect(() => {
    calculateSpan();

    const card = cardRef.current;
    if (!card || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      calculateSpan();
    });

    observer.observe(card);

    return () => observer.disconnect();
  }, [calculateSpan, item.src]);

  const handleCardClick = () => {
    navigate(`/pins/${item.id}`);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!boardChosen) {
      toast.error("Vui lòng chọn Board trước khi lưu!");
      return;
    }

    if (saved) {
      return;
    }

    try {
      await savePin({
        pin_id: item.id,
        board_id: boardChosen.id,
      });

      setSaved(true);
      toast.success(`Đã lưu vào board ${selectedBoardName || boardChosen.name}! ✨`);
    } catch (error) {
      toast.error("Lưu thất bại, vui lòng thử lại sau! 😢");
      console.error("Backend error:", error);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      style={{ gridRowEnd: `span ${span}` }}
    >
      <div className="overlayCard absolute inset-0 z-10 rounded-2xl bg-linear-to-b from-zinc-400 to-white opacity-0 mix-blend-multiply transition-opacity duration-100 group-hover:opacity-100" />

      <div className="overlayCard2 absolute inset-0 z-10 flex flex-col justify-between rounded-2xl opacity-0 transition-opacity duration-100 group-hover:opacity-100">
        <div className="m-2 flex items-center justify-between text-white">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenBoardMenu(e, item);
            }}
            className="boardname flex items-center justify-center gap-2 rounded-xl bg-black/30 px-5 py-3"
          >
            {selectedBoardName || ""} <MdExpandMore size={18} />
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`savebutton flex items-center justify-center rounded-xl px-6 py-3 text-white transition-colors duration-200 ${
              saved ? "bg-red-800" : "bg-red-600"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>

        <div className="m-2 flex items-center justify-between px-2">
          <div className="opensite" />
        </div>
      </div>

      <img
        ref={imgRef}
        src={item.src}
        alt={item.name || "pin image"}
        onLoad={calculateSpan}
        className="block w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </div>
  );
}
