import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const topicList = [
  "All",
  "INFP.",
  "art",
  "Clothes",
  "Otp",
  "space",
  "Genshin husbando",
  "design",
  "Endfield",
  "Mbti couple 2",
  "Aesthetics",
  "materials",
  "Genshin",
  "My style",
  "photo ideas",
  "room decor",
  "color palette",
  "anime core",
];

export default function TopicSlider() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;

      setCanScrollLeft(track.scrollLeft > 8);
      setCanScrollRight(track.scrollLeft < maxScrollLeft - 8);
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleSlide = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const scrollAmount = Math.max(track.clientWidth * 0.7, 240);

    track.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex w-full min-w-0 items-center gap-4" aria-label="Suggested topics">
      <button
        type="button"
        className="mb-3 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-white text-zinc-900 shadow-[0_4px_14px_rgba(17,17,17,0.08)] transition hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-30 disabled:shadow-none"
        aria-label="Previous topics"
        onClick={() => handleSlide("prev")}
        disabled={!canScrollLeft}
      >
        <FiChevronLeft size={20} />
      </button>

      <div
        ref={trackRef}
        className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {topicList.map((topic, index) => (
          <button
            key={`${topic}-${index}`}
            type="button"
            className={`relative flex-shrink-0 whitespace-nowrap px-[0.4rem] pb-[0.9rem] text-base font-medium text-zinc-900 ${index === 0
              ? "after:absolute after:left-[0.4rem] after:right-[0.4rem] after:bottom-[0.2rem] after:h-[3px] after:rounded-full after:bg-zinc-900 after:content-['']"
              : ""
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mb-3 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-white text-zinc-900 shadow-[0_4px_14px_rgba(17,17,17,0.08)] transition hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-30 disabled:shadow-none"
        aria-label="More topics"
        onClick={() => handleSlide("next")}
        disabled={!canScrollRight}
      >
        <FiChevronRight size={20} />
      </button>
    </section>
  );
}
