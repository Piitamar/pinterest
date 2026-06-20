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
import { Link, useParams } from "react-router-dom";
import { usePins } from "./usePin";
import { useUser } from "../auth/useUser";

export default function Pin() {
  const { pinId } = useParams();
  const pin = usePins(pinId);

  const user = useUser(pinId);
  console.log(user);

  if (!pin?.src) {
    return (
      <main className="ml-[7vw] w-[92vw] px-5 pb-5 pt-3">
        <section className="flex min-h-[calc(100vh-120px)] items-center justify-center rounded-[28px] border border-zinc-300 bg-white text-black">
          <p className="text-lg font-medium text-zinc-600">Loading pin...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="ml-[7vw] w-[92vw] px-5 pb-5 pt-3">
      <section className="flex min-h-[calc(100vh-120px)] overflow-hidden rounded-[28px] border border-zinc-300 bg-white">
        <div className="relative flex w-[38%] min-w-[430px] items-center justify-center bg-white px-4 py-4">
          <Link
            to="/"
            aria-label="Go back"
            className="absolute left-5 top-6 grid h-10 w-10 place-items-center text-black"
          >
            <FiArrowLeft size={30} strokeWidth={2} />
          </Link>

          <div className="relative h-full w-[58%] min-w-[380px] overflow-hidden">
            <img
              src={pin.src}
              alt={pin.name || "Pin"}
              className="block h-full w-full object-cover object-center"
            />

            <button
              type="button"
              aria-label="Expand image"
              className="absolute bottom-22 right-2 grid h-14 w-14 place-items-center rounded-full bg-white/65 text-black backdrop-blur-md"
            >
              <FiMaximize2 size={22} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              aria-label="Search image"
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-3xl bg-white/65 px-4 py-3 text-[16px] font-semibold text-black backdrop-blur-md"
            >
              <span>Search image</span>
              <FiRefreshCw size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-10 pb-6 pt-7">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-8 text-black">
              <button
                type="button"
                className="flex items-center gap-3 text-black"
                aria-label="Like"
              >
                <FiHeart size={30} strokeWidth={2} />
                <span className="text-[18px] font-semibold">19</span>
              </button>

              <button
                type="button"
                aria-label="Comment"
                className="text-black"
              >
                <FiMessageCircle size={30} strokeWidth={2} />
              </button>

              <button
                type="button"
                aria-label="Share"
                className="text-black"
              >
                <FiUpload size={30} strokeWidth={2} />
              </button>

              <button
                type="button"
                aria-label="More"
                className="text-black"
              >
                <FiMoreHorizontal size={34} strokeWidth={2.2} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-1 text-[18px] font-semibold text-black"
              >
                <span>art</span>
                <FiChevronDown size={18} strokeWidth={2} />
              </button>

              <button
                type="button"
                className="rounded-[24px] bg-[#e60023] px-6 py-4 text-[18px] font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <img
              src={null}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-[18px] text-black">{user?.username || null}</span>
          </div>

          <h1 className="mt-1 text-[24px] font-extrabold leading-none tracking-[-0.04em] text-black">
            {pin.name || null}
          </h1>

          <div className="mt-4">
            <h2 className="text-[15px] font-extrabold text-black">Description</h2>

            <p className="mt-3 text-[14px] leading-6 text-zinc-600">
              <span>{pin.description || null}</span>
            </p>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 rounded-[34px] border border-zinc-300 px-5 py-3.5">
              <input
                type="text"
                placeholder="Add a comment to start the conversation"
                className="min-w-0 flex-1 bg-transparent text-[16px] text-zinc-800 outline-none placeholder:text-zinc-400"
              />

              <div className="flex items-center gap-4 text-black">
                <button type="button" aria-label="Emoji">
                  <FiSmile size={26} strokeWidth={1.9} />
                </button>
                <button type="button" aria-label="Sticker">
                  <FiPlusSquare size={26} strokeWidth={1.9} />
                </button>
                <button type="button" aria-label="Image">
                  <FiImage size={26} strokeWidth={1.9} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
