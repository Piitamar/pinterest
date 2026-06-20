import { useParams } from 'react-router-dom';
import { FiUpload, FiMoreHorizontal, FiFeather, FiStar, FiScissors } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { fetchPinsForBoard } from './apiBoards';

export default function ViewBoard() {
    const { boardId } = useParams();
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        if (!boardData) {
            const getPinData = async () => {
                const pins = await fetchPinsForBoard(boardId);
                setBoardData({ pins });
            };
            getPinData();
        }
    }, [boardData, boardId]);

    return (
        <main className="p-8 ml-20">
            <div className="flex items-start justify-between">
                <div className='mb-20'>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight lowercase">design</h1>
                    <p className="mt-1 text-sm text-zinc-600">9 Pins</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="flex flex-col items-center gap-2">
                            <button className="rounded-[25px] bg-zinc-100 p-5.5 flex items-center justify-center shadow-xs">
                                <FiFeather size={28} />
                            </button>
                            <span className="text-sm font-semibold">Organize</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <button className="rounded-[25px] bg-zinc-100 p-5.5 flex items-center justify-center shadow-xs">
                                <FiStar size={28} />
                            </button>
                            <span className="text-sm font-semibold">More ideas</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <button className="rounded-[25px] bg-zinc-100 p-5.5 flex items-center justify-center shadow-xs">
                                <FiScissors size={28} />
                            </button>
                            <span className="text-sm font-semibold">Collage</span>
                        </div>

                        <button className=" ml-5 rounded-[20px] mb-5 bg-zinc-200 px-4 py-4.5 flex items-center gap-3 text-base shadow-xs hover:shadow-md">
                            <FiUpload size={20} />
                            <span className="font-medium">Share</span>
                        </button>

                        <button className="rounded-[20px] mb-5 bg-zinc-200 px-4 py-4.5 flex items-center justify-center shadow-xs hover:shadow-md">
                            <FiMoreHorizontal size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <section className="mt-6">
                <div className="grid grid-cols-4 gap-4">
                    {boardData?.pins.map((pin) => (
                        <div key={pin.id} className="rounded-2xl overflow-hidden">
                            <img src={pin.src} alt={pin.title} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}