import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
import {Link} from 'react-router-dom';
import CreatedCard from "./CreatedCard";
import DummyCard from "./DummyCard";
import dummy from "../utilities/Dummy";

function MyProjectsList({ creations , fetchDesign }) {

  return (
    <div className="bg-[linear-gradient(to_right,_#D6EBEE,_#01BABE),linear-gradient(to_bottom,_#D6EBEE,_#ffffff,_#ffffff)] bg-blend-overlay shadow-[15px_15px_40px_gray] overflow-y-scroll  w-full h-[98vh] rounded-t-2xl mt-[1%] mr-[1%] flex flex-col items-center px-4 pt-10 my-scrollbar">
      <div className="w-full justify-center flex flex-col items-center mb-10">
        <h1
          style={{ fontFamily: "Fredericka the Great" }}
          className="text-[30px] py-5 font-bold bg-gradient-to-b  from-[#01EBEE] to-[#02457A] bg-clip-text text-transparent"
        >
          Explore Your Generated ID Cards
        </h1>
        <div className="w-180 h-13 relative flex justify-between items-center px-5">
          <IoSearchOutline className="z-2 text-2xl" />
          <IoArrowForward className="z-2 text-2xl" />
          <input
            type="text"
            placeholder="Search your designs"
            className="px-15 top-0 left-0 w-180 h-full absolute border-1 border-[#258ce0] outline-none rounded-xl shadow-[0_0_10px_0px_rgba(128,128,128,0.3)] bg-white"
          />
        </div>
      </div>
      <div className="w-full h-max flex flex-col gap-5">
        <h1
          className="text-[23px] font-medium w-full text-gray-500"
          style={{ fontFamily: "Unbounded" }}
        >Recent Designs
        </h1>
        {
           creations.length > 0 ?
          <div className="w-full h-max pb-10 gap-6 flex flex-wrap">
          {
            creations.map((proj, index) => {
            return (
              <CreatedCard proj={proj} key={proj.id || index} fetchDesign={fetchDesign} />
              );
            })
          }  
        </div> 
        :
        <div style={{fontFamily:"Nunito Sans, sans-serif"}} className="w-full h-100 flex flex-col items-center justify-center text-[17px] gap-2">
          <h1 className="text-2xl font-bold"> This is your creative space ✨. Anything you design will show up here.</h1>
          <p className="text-[15px]">Right now, it’s empty — but not for long! Start crafting something awesome and it’ll live right here.</p> 
          <Link to="/GenerateID" className="text-[15px] text-blue-400 hover:underline hover:text-blue-700">Click here</Link>       
        </div>
        }
      </div>
    </div>
  );
}

export default MyProjectsList;
