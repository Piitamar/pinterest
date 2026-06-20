import { RiHomeSmileFill, RiHomeSmileLine } from "react-icons/ri";
import { TbLayoutBoard, TbLayoutBoardFilled } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaBell, FaRegBell } from "react-icons/fa";
import { BiMessageSquare, BiSolidMessageSquare } from "react-icons/bi";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LeftBar() {
  const [click, setClick] = useState('');
  const onClick = (icon) => {setClick(icon)};

  return (
    <main className="fixed left-0 top-0 w-[7vw] h-full bg-white border-r border-gray-300 z-10">
      <ul className="list-none pb-8 pl-6 flex flex-col gap-10 pt-8">
        <div className='flex group relative'>
          <li><Link to='/'><img src="./Pinterest.svg.png" className="w-7 pb-2" /></Link></li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-12 h-8 pt-1.5 bg-black rounded-lg text-white">
            Home</span>
        </div>

        <div className='flex group relative'>
          <li><Link to='/'>
                  { (click=='home')?
                      (<RiHomeSmileFill size={30} />)
                    : (<RiHomeSmileLine size={30}
                                        onClick={() => onClick("home")}/>) } 
                                        </Link></li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-12 h-8 pt-1.5 bg-black rounded-lg text-white">
            Home</span>
        </div>

        <div className='flex group relative'>
          <li><Link to='/myBoards'>
                    { (click=='board')?
                      (<TbLayoutBoardFilled size={30} />)
                    : (<TbLayoutBoard size={30}
                                        onClick={() => onClick("board")}/>) }
                                  </Link></li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-20 h-8 pt-1.5 bg-black rounded-lg text-white">
            Your boards</span>
        </div>

        <div className='flex group relative ml-0.5'>
          <li><Link to='/create'>
                  { (click=='create')?
                      (<FaSquarePlus size={27} />)
                    : (<FaRegPlusSquare size={27}
                                        onClick={() => onClick("create")}/>) }
                                    </Link></li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-12 h-8 pt-1.5 bg-black rounded-lg text-white">
            Create
          </span>
        </div>

        <div className='flex group relative'>
          <li>
            { (click=='update')?
                      (<FaBell size={29} />)
                    : (<FaRegBell size={29}
                                        onClick={() => onClick("update")}/>) }
          </li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-14 h-8 pt-1.5 bg-black rounded-lg text-white">
            Updates
          </span>
        </div>

        <div className='flex group relative'>
          <li>
            { (click=='message')?
                      (<BiSolidMessageSquare size={30} />)
                    : (<BiMessageSquare size={30}
                                        onClick={() => onClick("message")}/>) }
          </li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 text-xs text-center w-16 h-8 pt-1.5 bg-black rounded-lg text-white">
            Messages
          </span>
        </div>

        <div className='flex group relative'>
          <li className="pt-38">
            { (click=='setting')?
                      (<IoSettings size={30} />)
                    : (<IoSettingsOutline size={30}
                                        onClick={() => onClick("setting")}/>) }
          </li>
          <span className="hidden absolute group-hover:block pointer-events-none ml-10 mt-37 text-xs text-center w-29 h-8 pt-1.5 bg-black rounded-lg text-white">
            Settings & Support
          </span>
        </div>
      </ul>
    </main>
  )
}
