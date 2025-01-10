/* eslint-disable react/prop-types */
import logo from "../assets/genie.svg";
import { FiPlus } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import "./Components.css";

const Sidebar = ({ isSidebarMinimized, toggleSidebar }) => {
  return (
    <div
      className={`${
        isSidebarMinimized ? "flex-[0.05]" : "flex-[0.2]"
      } transition-all duration-300 flex flex-col border-r-[2px]  text-white `}
    >
      {/* Top Section with Toggle Button */}
      <div className="p-4 flex items-center justify-between border-b-[2px]">
        <img
          src={logo}
          alt="Genie Logo"
          className={`${
            isSidebarMinimized ? "w-[40px]" : "w-[60px]"
          } transition-all duration-300`}
        />
        {!isSidebarMinimized && (
          <h1 className=" font-bold text-xl">Genie-Chat-Bot</h1>
        )}
        <button
          className=" text-2xl cursor-pointer"
          onClick={toggleSidebar}
        >
          {isSidebarMinimized ? <IoMdArrowDropright /> : <IoMdArrowDropleft />}
        </button>
      </div>

      {/* Main Content */}
      {!isSidebarMinimized ? (
        <div className="flex flex-col h-full border-b-[2px]">
          <div className="upperSide flex flex-col p-4 gap-4  flex-[0.8]">
            <div className="new-chat-btn flex items-center justify-center bg-[#19A7CE] text-white font-semibold text-xl rounded-md py-2 gap-1 cursor-pointer gradient-background">
              <FiPlus className="text-[25px]" />
              <button>New Chat</button>
            </div>

            <div className="chat-queries flex flex-col gap-2">
              <div className="query-btn flex items-center justify-start ps-2 bg-[#dbedf6] rounded-md py-2 gap-2">
                <CiChat1 className="text-[20px] text-[#146C94]" />
                <button>Write an article on democracy</button>
              </div>

              <div className="query-btn flex items-center justify-start ps-2 bg-[#dbedf6] rounded-md py-2 gap-2">
                <CiChat1 className="text-[20px] text-[#146C94]" />
                <button>What is 22+22?</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full  border-b-[2px] ">
          <div className="upperSide flex flex-col p-4 gap-4  flex-[0.8]">
            <div className="new-chat-btn flex items-center justify-center bg-[#19A7CE] text-white font-semibold text-xl rounded-md py-2 gap-1 cursor-pointer gradient-background">
              <FiPlus className="text-[25px]" />
            </div>
          </div>
        </div>
      )}

      {/* Lower Section */}
      <div
        className={`lowerSide flex flex-col gap-2 p-4 ${
          isSidebarMinimized ? "items-center " : "justify-center"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <IoMdHome className="text-[25px]" />
            {!isSidebarMinimized && <span>Home</span>}
          </li>
          <li className="flex items-center gap-2">
            <FaBookmark className="text-[25px]" />
            {!isSidebarMinimized && <span>Saved</span>}
          </li>
          <li className="flex items-center gap-2">
            <GrUpgrade className="text-[25px]" />
            {!isSidebarMinimized && <span>Upgrade to Pro</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;