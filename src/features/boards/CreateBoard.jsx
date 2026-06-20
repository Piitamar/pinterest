import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { createBoard } from "./apiBoards";

export default function CreateBoard() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);
  const isDisabled = boardName.trim().length === 0;

  useEffect(() => {
    setPortalTarget(document.getElementById("mainpage-portal-root"));
  }, []);

  if (!portalTarget) {
    return null;
  }

  //hàm chạy khi ấn create board
  const handleCreateBoardButton = async() => {
    await createBoard(boardName);
    setBoardName('')
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 px-3 py-3 md:px-6 md:py-6">
      <section className="flex h-[calc(100vh-24px)] w-full max-w-xl flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:h-[calc(100vh-50px)]">
        <div className="w-full flex items-end justify-end">
            <button
            type="button"
            aria-label="Close create board"
            onClick={() => navigate("/")}
            className=" flex items-center pb-2 m-1 justify-center text-center h-10 w-10 rounded-full text-3xl font-light text-black transition hover:bg-zinc-100"
            >
            x
            </button>
        </div>

        <div className="flex-1 px-5 pt-4 sm:px-7">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            Create a board
          </h1>

          <div className="mx-auto mt-8 flex max-w-130 flex-col items-center">
            <div className="grid h-18.5 w-30 grid-cols-[1.55fr_0.75fr] grid-rows-2 gap-px overflow-hidden rounded-xl bg-white">
              <div className="row-span-2 rounded-l-xl bg-[#dfddd7]" />
              <div className="rounded-tr-xl bg-[#dfddd7]" />
              <div className="rounded-br-xl bg-[#dfddd7]" />
            </div>

            <div className="mt-8 w-full">
              <label className="block text-sm font-semibold text-black">Board name</label>
              <div className="mt-3 rounded-2xl border border-zinc-400 px-5 py-4">
                <input
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  placeholder="Name your board"
                  className="w-full border-none bg-transparent text-zinc-700 outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="mt-8 flex w-full items-center justify-between gap-4">
              <div>
                <h2 className=" font-medium tracking-tight text-black">
                  Make this board secret
                </h2>
                <p className="mt-1.5 text-sm text-zinc-600">
                  Only you and collaborators will see this board
                </p>
              </div>

              <button
                type="button"
                aria-pressed={isSecret}
                onClick={() => setIsSecret((prev) => !prev)}
                className={`relative h-7 w-13 shrink-0 rounded-full transition-transform duration-400 ease-in-out ${
                  isSecret ? "bg-black" : "bg-zinc-400"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform duration-400 ease-in-out ${
                    isSecret ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 px-5 py-5 sm:px-7">
          <button
            type="button"
            onClick={handleCreateBoardButton}
            disabled={isDisabled}
            className="h-12 w-full rounded-xl bg-[#e6e4df] font-semibold text-zinc-500 transition disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </section>
    </div>,
    portalTarget
  );
}
