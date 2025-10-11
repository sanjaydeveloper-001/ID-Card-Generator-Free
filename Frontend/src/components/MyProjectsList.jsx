import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CreatedCard from "./CreatedCard";
import DummyCard from "./DummyCard";
import dummy from "../utilities/Dummy";
import SideBar from "./SideBar";

function MyProjectsList({ creations, setDesign , setMode ,handleDeleteCreation}) {
  return (
    <div className="flex w-full sm:w-[95.5%]">
      <div className="hidden md:flex" ><SideBar className="hidden md:flex flex-shrink-0" creations={creations} handleDeleteCreation={handleDeleteCreation} /></div>
      <div className="bg-[linear-gradient(to_right,_#D6EBEE,_#01BABE),linear-gradient(to_bottom,_#D6EBEE,_#ffffff,_#ffffff)] bg-blend-overlay shadow-[15px_15px_40px_gray] overflow-y-scroll w-full h-[98vh] rounded-t-2xl mt-[1%] mr-[1%] flex flex-col items-center px-4 pt-10 my-scrollbar">
      <div className="w-full max-w-7xl justify-center flex flex-col items-center mb-10 px-2 sm:px-4 md:px-6">
        <h1
          style={{ fontFamily: "Fredericka the Great" }}
          className="text-2xl sm:text-3xl md:text-4xl py-5 font-bold bg-gradient-to-b from-[#01EBEE] to-[#02457A] bg-clip-text text-transparent"
        >
          Explore Your Generated ID Cards
        </h1>
        <div className="w-full max-w-200 h-10 sm:h-12 relative flex justify-between items-center sm:px-5">
          <IoSearchOutline className="z-2 text-xl sm:text-2xl ml-2" />
          <IoArrowForward className="z-2 text-xl sm:text-2xl mr-2 md:-mr-5" />
          <input
            type="text"
            placeholder="Search your designs"
            className="pl-10 w-full h-full absolute border border-[#258ce0] outline-none rounded-xl shadow-[0_0_10px_0px_rgba(128,128,128,0.3)] bg-white"
          />
        </div>
      </div>

      <div className="w-full max-w-7xl h-max flex flex-col gap-5 px-2 sm:px-4 md:px-6">
        <h1
          className="text-lg sm:text-xl md:text-2xl font-medium w-full text-gray-500"
          style={{ fontFamily: "Unbounded" }}
        >
          Recent Designs
        </h1>

        {creations.length > 0 ? (
          <div className="w-full h-max pb-10 gap-6 flex flex-wrap justify-start">
            {creations.map((proj, index) => (
              <CreatedCard proj={proj} key={proj.id || index} setDesign={setDesign} setMode={setMode} />
            ))}
          </div>
        ) : (
          <div
            style={{ fontFamily: "Nunito Sans, sans-serif" }}
            className="w-full min-h-[250px] flex flex-col items-center justify-center text-base sm:text-lg gap-2 px-4 text-center"
          >
            <h1 className="text-xl sm:text-2xl font-bold">
              This is your creative space ✨. Anything you design will show up here.
            </h1>
            <p className="text-sm sm:text-base">
              Right now, it’s empty — but not for long! Start crafting something awesome and it’ll live right here.
            </p>
            <Link
              to="/IDCreation"
              className="text-sm sm:text-base text-blue-400 hover:underline hover:text-blue-700"
            >
              Click here
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default MyProjectsList;
