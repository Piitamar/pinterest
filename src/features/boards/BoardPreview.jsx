import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestPinsForBoardPreview } from "./apiBoards";

function formatRelativeTime(createdAt) {

  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const diff = Math.max(now - createdTime, 0);
  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;
  const month = day * 30;

  if (diff >= month) {
    return `${Math.floor(diff / month)}mo`;
  }

  if (diff >= week) {
    return `${Math.floor(diff / week)}w`;
  }

  return `${Math.max(1, Math.floor(diff / day))}d`;
}

export default function BoardPreview({ board }) {
  const [previewPins, setPreviewPins] = useState([]);

  useEffect(() => {
    const fetchPreviewPins = async () => {
      try {
        const pinsData = await fetchLatestPinsForBoardPreview(board.id);
        setPreviewPins(pinsData);
      } catch (error) {
        console.error("Loi lay du lieu preview pins:", error);
      }
    };

    fetchPreviewPins();
  }, [board.id]);

  const firstPin = previewPins[0]?.src ?? "";
  const secondPin = previewPins[1]?.src ?? "";
  const thirdPin = previewPins[2]?.src ?? "";

  return (
    <Link to={`/board/${board.id}`}>
      <article className="flex w-66 flex-col gap-2.5">
        <div className="grid h-45 grid-cols-[2fr_1fr] grid-rows-2 gap-1 overflow-hidden rounded-[18px] bg-zinc-100">
          <div className="row-span-2 overflow-hidden bg-zinc-200">
            {firstPin ? (
              <img src={firstPin} alt={board.name} className="h-full w-full object-cover" />
            ) : null}
        </div>

        <div className="overflow-hidden bg-zinc-200">
          {secondPin ? (
            <img src={secondPin} alt={board.name} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div className="overflow-hidden bg-zinc-200">
          {thirdPin ? (
            <img src={thirdPin} alt={board.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold tracking-tight text-black">{board.name}</h3>
        <div className="mt-0.5 flex items-center gap-2 text-sm text-zinc-700">
          <span>{previewPins.length} Pins</span>
          <span>{formatRelativeTime(board.created_at)}</span>
        </div>
      </div>
    </article>
    </Link>
  );
}
