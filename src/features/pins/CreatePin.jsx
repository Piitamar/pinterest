import { GrUploadOption } from "react-icons/gr";
import { IoIosArrowUp } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { addNewPin, imageProcessing } from "./apiPins";

export default function CreatePin() {
    //ref cho chọn ảnh
    const fileRef = useRef();
    const [imageUrl, setImageUrl] = useState(null);
    
    const [pinData, setPinData] = useState({
        name: "",
        description: "",
        link: "",
        src: "",
        width: "",
        height: "",
    });
    
    //ref cho chọn board
    const chooseBoardRef = useRef(null);
    const [portalContainer, setPortalContainer] = useState(null);
    const [ready, setReady] = useState(false);
    const [allowComments, setAllowComments] = useState(true);

    //Mở file khi ấn nút
    const openFile=() => {
            fileRef.current.click();
        }

    const handleChange = () => {
        const file = fileRef.current.files[0]; // lấy file đầu tiên

        if (file) {
        const url = URL.createObjectURL(file); // tạo URL để preview ảnh
        setImageUrl(url);

        // 2. Tạo một đối tượng Image ảo trong bộ nhớ
        const img = new Image();
        img.src = url;

        // 3. Chờ ảnh tải xong trong bộ nhớ để lấy kích thước
        img.onload = async function() {
            const width = img.naturalWidth;   
            const height = img.naturalHeight;
            URL.revokeObjectURL(url); 

            //Lưu link ảnh vào supabase storage
            const fileName = `${Date.now()}_${file.name}`; 
        
            //process ảnh
            try {
                const realLink = await imageProcessing(fileName, file);
                
                setPinData((prev) => ({
                    ...prev,
                    src: realLink,
                    width: width,
                    height: height
                }));
                } catch (error) {
                console.error("Lỗi rồi:", error);
                }
            }
    }};

    //onclick nút chọn bảng và nút allow cmt
    const handleChooseBoard = () => {
        setReady(prev => !prev);
    }

    const handleAllowComments = () => {
        setAllowComments((prev) => !prev);
    }

    useEffect(() => {
        // set container after mount so we don't access ref during render
        setPortalContainer(chooseBoardRef.current);
    }, []);

    //onclick nút hiện ảnh
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setPinData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    //onclick submit ảnh
    const submit = async () => {
        const result = await addNewPin(pinData);

        if (!result) {
            return;
        }

        alert("Pin vua duoc tao:");
        console.log("pin vừa được tạo:", result)

    }

  return (
    <main className="page">
      <section className="flex h-18 w-97vw items-center justify-between border-t border-b border-zinc-300 px-10">
        <span className="text-xl font-bold text-black">Create Pin</span>
        <button
            type="button"
            onClick={submit}
            className="rounded-xl w-20 flex justify-center bg-red-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
        >
            Publish
        </button>
      </section>

      <section className="p-10 flex gap-10">
        <div className="left w-[30vw]">
            <div onClick={openFile} 
                 className="w-[28vw] overflow-hidden h-100 bg-zinc-200 items-center rounded-2xl">
                
                {imageUrl? 
                (<div className="relative">
                    <img src={imageUrl} alt="preview" />
                    <button className="absolute top-3 left-5 w-20 text-sm text-center h-10 rounded-xl flex items-center justify-center backdrop-blur-2xl p-3 bg-white"
                          onClick={openFile}
                        >Edit</button>
                    <input
                        type="file"
                        ref={fileRef}
                        className="hidden"
                        onChange={handleChange}
                    />
                </div>
                ) :

                (<div className="w-[28vw] h-100 flex flex-col bg-zinc-200 items-center pt-35 gap-20 rounded-2xl">
                   <div className="flex flex-col items-center gap-2">
                    <GrUploadOption size={30} />
                    <div className="font-bold text-center px-20">    
                        Choose a file or
                        drag and drop it here
                    </div>
                   </div> 

                    <div className="text-sm text-zinc-600 text-center p-5">
                        we recommend using high quality .jpg files less than 20mb or .mp4 files less than 200mb
                    </div>

                    <input
                        type="file"
                        ref={fileRef}
                        className="hidden"
                        onChange={handleChange}
                    />
                </div>
                )}
            </div>

            <hr className="my-5 w-[28vw] text-zinc-300"></hr>
            
            <Link to='/createPin/saveFromUrl'>
                <div className="w-[28vw] font-bold bg-zinc-200 h-10 rounded-xl flex items-center justify-center">
                    save from url
                </div>
            </Link>
        </div>

        <div className="right w-[50vw] flex flex-col gap-5 pt-1">
            <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-zinc-900">
                    Title
                </label>
                <input
                    type="text"
                    name="name"
                    value={pinData.name}
                    onChange={handleInputChange}
                    placeholder="Add a title"
                    className="h-15 w-full rounded-xl border border-zinc-300 bg-zinc-200 px-6  text-zinc-700 outline-none placeholder:text-zinc-500"
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-zinc-900">
                    Description
                </label>
                <textarea
                    name="description"
                    value={pinData.description}
                    onChange={handleInputChange}
                    placeholder="Add a detailed description"
                    className="h-30 w-full resize-none rounded-xl border border-zinc-300 bg-zinc-200 px-6 py-5 text-zinc-700 outline-none placeholder:text-zinc-500"
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-zinc-900">
                    Link
                </label>
                <input
                    type="text"
                    name="link"
                    value={pinData.link}
                    onChange={handleInputChange}
                    placeholder="Add a link"
                    className="h-15 w-full rounded-xl border border-zinc-300 bg-zinc-200 px-6 text-zinc-700 outline-none placeholder:text-zinc-500"
                />
            </div>

            <div className="flex flex-col gap-3"
                 ref={chooseBoardRef}
                 onClick={handleChooseBoard}>
                
                {ready && portalContainer &&
                    createPortal(
                        <div className="fixed p-10 top-68 right-50 w-100 h-60 bg-white rounded-2xl shadow-2xl">
                            chọn bảng
                        </div>,
                        portalContainer
                    )
                }
                    <label className="text-xs font-semibold text-zinc-900">
                    Board
                </label>
                <button
                    type="button"
                    className="h-15 w-full rounded-xl border border-zinc-300 bg-zinc-200 px-6 text-left text-zinc-500"
                >
                    Choose a board
                </button>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-zinc-500">
                    Tagged topics (0)
                </label>
                <input
                    type="text"
                    placeholder="Search for a tag"
                    className="h-15 w-full rounded-xl border border-zinc-300 bg-zinc-200 px-6 text-zinc-700 outline-none placeholder:text-zinc-500"
                />
            </div>

            <div className="mt-8 flex w-full justify-end">
                <div className="w-full max-w-70">
                    <div className="flex items-center gap-2 text-[18px] font-bold text-black">
                        <span>More options</span>
                        <IoIosArrowUp size={16} />
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="button"
                            aria-pressed={allowComments}
                            onClick={handleAllowComments}
                            className={`relative h-8 w-14 rounded-full transition-colors ${
                                allowComments ? "bg-indigo-500" : "bg-zinc-300"
                            }`}
                        >
                            <span
                                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
                                    allowComments ? "translate-x-6" : null
                                }`}
                            />
                        </button>

                        <span className="max-w-50 text-[16px] leading-5 text-black">
                            Allow people to comment
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
