import {
  FiArrowLeft,
  FiChevronDown,
  FiHeart,
  FiImage,
  FiMaximize2,
  FiMessageCircle,
  FiMoreHorizontal,
  FiPlusSquare,
  FiRefreshCw,
  FiSmile,
  FiUpload,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const pinImage =
  "https://i.pinimg.com/originals/0f/1a/95/0f1a95faf602fb4f6d5767f2e22994ad.jpg";

export default function SaveFromUrl() {
  return (
    <main className="ml-[7vw] w-[92vw] px-5 pb-5 pt-3">
      <section className="flex min-h-[calc(100vh-120px)] overflow-hidden rounded-[28px] border border-zinc-300 bg-white">
        <div className="relative flex w-[39%] min-w-[470px] items-center justify-center bg-white px-5 py-4">
          <Link
            to="/createPin"
            aria-label="Go back"
            className="absolute left-6 top-7 grid h-12 w-12 place-items-center text-black"
          >
            <FiArrowLeft size={42} strokeWidth={1.9} />
          </Link>

          <div className="relative h-full w-[63%] min-w-[480px] overflow-hidden">
            <img
              src={pinImage}
              alt="Amiya"
              className="block h-full w-full object-cover object-center"
            />

            <button
              type="button"
              aria-label="Expand image"
              className="absolute bottom-25 right-2 grid h-18 w-18 place-items-center rounded-full bg-white/65 text-black backdrop-blur-md"
            >
              <FiMaximize2 size={34} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              aria-label="Search image"
              className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-3xl bg-white/65 px-6 py-4 text-[22px] font-semibold text-black backdrop-blur-md"
            >
              <span>Search image</span>
              <FiRefreshCw size={26} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-14 pb-8 pt-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-12 text-black">
              <button
                type="button"
                className="flex items-center gap-4 text-black"
                aria-label="Like"
              >
                <FiHeart size={46} strokeWidth={1.9} />
                <span className="text-[23px] font-semibold">19</span>
              </button>

              <button
                type="button"
                aria-label="Comment"
                className="text-black"
              >
                <FiMessageCircle size={46} strokeWidth={1.9} />
              </button>

              <button
                type="button"
                aria-label="Share"
                className="text-black"
              >
                <FiUpload size={46} strokeWidth={1.9} />
              </button>

              <button
                type="button"
                aria-label="More"
                className="text-black"
              >
                <FiMoreHorizontal size={52} strokeWidth={2.2} />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                className="flex items-center gap-2 text-[24px] font-semibold text-black"
              >
                <span>art</span>
                <FiChevronDown size={28} strokeWidth={2} />
              </button>

              <button
                type="button"
                className="rounded-[26px] bg-[#e60023] px-8 py-6 text-[22px] font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt="MornDew"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-[22px] text-black">MornDew</span>
          </div>

          <h1 className="mt-4 text-[56px] font-extrabold leading-none tracking-[-0.04em] text-black">
            Amiya
          </h1>

          <div className="mt-12">
            <h2 className="text-[30px] font-extrabold text-black">Description</h2>

            <p className="mt-8 text-[28px] leading-10 text-zinc-600">
              <span className="text-[#4f46e5]">#arknights</span>{" "}
              <span>Author: 林路_Linlu (Pixiv)</span>
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-4 rounded-[34px] border border-zinc-300 px-7 py-5">
              <input
                type="text"
                placeholder="Add a comment to start the conversation"
                className="min-w-0 flex-1 bg-transparent text-[24px] text-zinc-800 outline-none placeholder:text-zinc-400"
              />

              <div className="flex items-center gap-5 text-black">
                <button type="button" aria-label="Emoji">
                  <FiSmile size={38} strokeWidth={1.9} />
                </button>
                <button type="button" aria-label="Sticker">
                  <FiPlusSquare size={38} strokeWidth={1.9} />
                </button>
                <button type="button" aria-label="Image">
                  <FiImage size={38} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
