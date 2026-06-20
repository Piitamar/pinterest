import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import BoardPreview from "./BoardPreview";
import {
  fetchMyBoards,
  fetchMyProfile,
} from "./apiBoards";

export default function MyBoards() {
  const [boards, setBoards] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [boardsData, profileData] = await Promise.all([
          fetchMyBoards(),
          fetchMyProfile(),
        ]);

        setBoards(boardsData);
        setProfile(profileData);
      } catch (error) {
        console.error("Loi lay du lieu your boards:", error);
      }
    };

    getData();
  }, []);

  const avatarLetter = profile?.username?.trim()?.charAt(0)?.toUpperCase() || "A";
  const username = profile?.username?.trim() || "abc";

  return (
    <main className="page bg-white pl-7 pr-6 pt-7">
      <section className="flex items-start justify-between gap-6">
        <div className="pt-7">
          <h1 className="text-3xl font-semibold tracking-tight text-black">Your saved ideas</h1>

          <div className="mt-7 flex items-center gap-6 text-[18px] font-medium text-black">
            <button type="button" className="opacity-80">
              Pins
            </button>
            <div className="flex flex-col items-center">
              <button type="button">Boards</button>
              <div className="mt-1.5 h-0.5 w-13 rounded-full bg-black" />
            </div>
            <button type="button" className="opacity-80">
              Collages
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-200 text-2xl font-medium text-black">
            {avatarLetter}
          </div>

          <div className="min-w-36">
            <div className="text-2xl font-semibold tracking-tight text-black">{username}</div>
            <div className="mt-1.5 text-sm font-medium text-black">7 followers · 5 following</div>
          </div>

          <button
            type="button"
            className="rounded-2xl bg-[#e9e6de] px-5 py-3 text-sm font-medium text-black"
          >
            Share profile
          </button>
        </div>
      </section>

      <section className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-zinc-100"
          >
            <HiOutlineAdjustmentsHorizontal size={24} />
          </button>

          <button
            type="button"
            className="rounded-2xl bg-[#e9e6de] px-5 py-2.5 text-sm font-semibold text-black"
          >
            Group
          </button>
        </div>

        <Link
          to="/createBoard"
          className="rounded-[18px] bg-red-600 px-6 py-3 text-base font-semibold text-white"
        >
          Create
        </Link>
      </section>

      <section className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(220px,260px))] gap-x-4 gap-y-8">
        {boards.map((board) => (
          <BoardPreview key={board.id} board={board} />
        ))}
      </section>
    </main>
  );
}
