import { createPortal } from "react-dom";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMyBoards, fetchLatestPinsForBoardPreview } from "./apiBoards";

export default function BoardSavePortal({
  isPortalOpen,
  onClose,
  boardChosen,
  setSelectedBoard
}) {
  //lấy boards 
  const [board, setBoard] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const boardData = await fetchMyBoards();
        setBoard(boardData);
      } catch (error) {
        console.error("Loi lay du lieu roi:", error);
      }
    };
    // Chỉ thực hiện fetch dữ liệu khi portal thực sự được mở lên
    if (isPortalOpen) {
      getData();
    }
  }, [isPortalOpen]);

  // tạo list preview: [{ id, srcpin }]
  const [previewList, setPreviewList] = useState([]);
  useEffect(() => {
    const getPreviews = async () => {
      try {
        const previews = await Promise.all(
          board.map(async (b) => {
            try {
              const previewData = await fetchLatestPinsForBoardPreview(b.id, 1);
              return { id: b.id, srcpin: previewData && previewData.length > 0 ? previewData[0].src : null };
            } catch (err) {
              console.error(`Loi lay preview cho board ${b.id}:`, err);
              return { id: b.id, srcpin: null };
            }
          })
        );
        setPreviewList(previews);
      } catch (error) {
        console.error("Loi lay preview board:", error);
      }
    };

    if (board.length > 0) {
      getPreviews();
    }
  }, [board]);

  //hàm chọn bảng
  const onSelectBoard = (b) => {
    setSelectedBoard(b)
    onClose()
  }

  //đk mở portal
  const portalTarget = document.getElementById("mainpage-portal-root");
  if (!isPortalOpen || !portalTarget) {return null;}

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose}>
      <section
        className="absolute left-1/2 top-1/2 flex h-160 w-105 -translate-x-1/2 -translate-y-1/2 scale-[0.88] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pb-3 pt-6">
          <h2 className="text-center text-[22px] font-semibold tracking-tight text-black">Save</h2>

          <div className="mt-5 flex items-center gap-3 rounded-[22px] border-[3px] border-indigo-500 px-4 py-2.5">
            <IoSearchOutline size={24} className="text-black" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-[18px] text-zinc-700 outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-5">
          <div className="boardcard flex flex-col gap-3 pt-3">
            {board.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBoard(b)}
                className={`flex items-center gap-3 rounded-2xl p-2 text-left transition-colors ${
                  boardChosen?.id === b.id ? "bg-zinc-100" : "hover:bg-zinc-50"
                }`}
              >
                <div className="h-18 w-18 overflow-hidden rounded-[14px] bg-zinc-200">
                  {(() => {
                    const p = previewList.find((item) => item.id === b.id);
                    return p && p.srcpin ? (
                      <img src={p.srcpin} alt={b.name} className="h-full w-full object-cover" />
                    ) : null;
                  })()}
                </div>

                <span className="text-[18px] font-semibold tracking-tight text-black">
                  {b.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-100 px-6 py-6">
          <Link
            to="/createBoard"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-[#e9e6de] text-[40px] font-extralight text-black">
              +
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-black">Create board</span>
          </Link>
        </div>
      </section>
    </div>,
    portalTarget
  );
}
