import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
import trashCan from "../assets/Trash.png";
import CreatedTrash from "./CreatedTrash";
import SideTrash from "./SideTrash";

function MyTrashList({ trash, setDesign, setMode }) {
  return (
    <div className="flex w-full sm:w-[95.5%]">
      <div className="hidden md:flex"><SideTrash trash={trash} setDesign={setDesign} /></div>
      <div className="bg-[linear-gradient(to_right,_#D6EBEE,_#01BABE),linear-gradient(to_bottom,_#D6EBEE,_#ffffff,_#ffffff)] bg-blend-overlay shadow-[15px_15px_40px_gray] overflow-y-scroll w-full h-[98vh] rounded-t-2xl mt-[1%] mr-[1%] flex flex-col items-center px-4 pt-10 my-scrollbar">

        {/* Title + Search */}
        <div className="w-full max-w-7xl flex flex-col items-center justify-center mb-10 px-2 sm:px-4 md:px-6">
          <h1
            style={{ fontFamily: "Fredericka the Great" }}
            className="text-2xl sm:text-3xl md:text-4xl py-5 font-bold bg-gradient-to-b from-[#01EBEE] to-[#02457A] bg-clip-text text-transparent"
          >
            Explore Your Trashed Items
          </h1>

          <div className="w-full max-w-200 h-10 sm:h-12 relative flex justify-between items-center sm:px-5">
            <IoSearchOutline className="z-2 text-xl sm:text-2xl ml-2" />
            <IoArrowForward className="z-2 text-xl sm:text-2xl mr-2 md:-mr-5" />
            <input
              type="text"
              placeholder="Search deleted items"
              className="pl-10 w-full h-full absolute border border-[#258ce0] outline-none rounded-xl shadow-[0_0_10px_0px_rgba(128,128,128,0.3)] bg-white"
            />
          </div>
        </div>

        {/* Trash Section */}
        <div className="w-full max-w-7xl h-max flex flex-col gap-5 px-2 sm:px-4 md:px-6">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-medium w-full text-gray-500"
            style={{ fontFamily: "Unbounded" }}
          >
            Trash
          </h1>

          {trash.length > 0 ? (
            <div className="w-full h-max pb-10 gap-6 flex flex-wrap justify-start">
              {trash.map((proj, index) => (
                <CreatedTrash
                  proj={proj}
                  key={proj.id || index}
                  setDesign={setDesign}
                  setMode={setMode}
                />
              ))}
            </div>
          ) : (
            <div
              style={{ fontFamily: "Nunito Sans, sans-serif" }}
              className="w-full min-h-[250px] flex flex-col items-center justify-center text-base sm:text-lg gap-2 px-4 text-center"
            >
              <img
                draggable={false}
                src={trashCan}
                className="w-40 sm:w-48 md:w-56 mb-4 opacity-90"
                alt="Trash Can"
              />
              <h1 className="text-xl sm:text-2xl font-bold">
                Any Designs You Trash Will End Up Here ♻️
              </h1>
              <p className="text-sm sm:text-base max-w-2xl">
                🗑️ This is your trash. Items here are not gone forever — you can
                still bring them back or 🧹 clean them out permanently.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTrashList;
