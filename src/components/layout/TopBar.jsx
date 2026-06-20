import { FiCamera, FiChevronDown, FiMic, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [showSignInBoard, setShowSignInBoard]= useState(false)
  
  return (
    <main className="w-[92vw] min-h-[10vh] h-[15vh] p-6 bg-white flex flex-col gap-7 ml-[7vw] z-20">
      <section className="flex items-center gap-5 h-12">

        <div className="flex-1 h-12 text-sm flex items-center gap-4 px-4 py-2 rounded-lg bg-gray-200">
          <FiSearch className="text-zinc-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none text-lg text-zinc-800 outline-none placeholder:text-zinc-500"
            aria-label="Search"
          />
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="w-12 h-12 grid place-items-center text-black bg-transparent" aria-label="Search by image">
            <FiCamera size={28} />
          </button>
          <button type="button" className="w-12 h-12 grid place-items-center text-black bg-transparent" aria-label="Voice search">
            <FiMic size={28} />
          </button>
          <button type="button"
                  className="flex items-center gap-3 pl-1 bg-transparent"
                  aria-label="Profile menu"
                  onClick={() => setShowSignInBoard(!showSignInBoard)}>
            <span className="w-8 h-8 rounded-full pt-1 bg-sky-200 text-slate-800 font-semibold text-sm flex items-center justify-center">A</span>
            <FiChevronDown size={22} className="text-gray-500" />
          </button>
        </div>

      </section>

      {showSignInBoard && (
       <div className="bg-black/70 flex flex-col text-white items-start pl-5 justify-evenly backdrop-blur-2xl rounded-2xl w-60 h-30 fixed right-5 top-20 z-20">
          <Link to='/signup'>
          <button className="bg-red-500 w-30 h-10 rounded-sm">
            Đăng kí
          </button>
          </Link>

          <Link to='/signin'>
          <button className="bg-red-500 w-30 h-10 rounded-sm">
            Đăng nhập
          </button>
          </Link>
        </div>
      )}

    </main>
  );
}
