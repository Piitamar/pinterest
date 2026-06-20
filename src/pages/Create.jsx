import { createPortal } from "react-dom";
import { TbLayoutBoard } from "react-icons/tb";
import { TiPinOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Create() {
    return createPortal(
        <main className="fixed top-30 left-90 w-screen h-screen text-white p-3">
            <section className="items-center justify-center bg-zinc-100 pt-0 p-6 gap-5 text-zinc-700 flex flex-col inset-0 w-[45vw] h-[60vh] rounded-2xl border border-black/30">

                <Link to="/createPin" className="w-full flex justify-center">
                    <div className="flex w-[30vw] gap-3.75 rounded-[13px] p-[0.4vw] hover:bg-[rgba(128,128,128,0.2)]">
                        <div className="bg-white rounded-[13px] w-[6vw] h-[6vw] shrink-0 flex items-center justify-center">
                            <TiPinOutline size={30} className="text-black" />
                        </div>

                        <div>
                            <div className="text-black text-lg">Pin</div>
                            <div className="text-sm">Post your photos or videos and add links, stickers, effects and more</div>
                        </div>
                    </div>
                </Link>

                <Link to="/createBoard" className="w-full flex justify-center">
                    <div className="flex w-[30vw] gap-3.75 rounded-[13px] p-[0.4vw] hover:bg-[rgba(128,128,128,0.2)]">
                        <div className="bg-white rounded-[13px] w-[6vw] h-[6vw] shrink-0 flex items-center justify-center">
                            <TbLayoutBoard size={30} className="text-black" />
                        </div>

                        <div>
                            <div className="text-black text-lg">Board</div>
                            <div className="text-sm">Organize your collection of your favorite Pins by creating a Board</div>
                        </div>
                    </div>
                </Link>
            </section>
        </main>,
        document.body
    );
}


