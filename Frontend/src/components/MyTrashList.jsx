import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
import trashCan from '../assets/Trash.png';
import CreatedTrash from "./CreatedTrash";

function MyTrashList({trash , proTrash , setTryConfirm , setDeleteDesign={setDeleteDesign} }) {

  return (
    <div className="bg-[linear-gradient(to_right,_#D6EBEE,_#01BABE),linear-gradient(to_bottom,_#D6EBEE,_#ffffff,_#ffffff)] bg-blend-overlay shadow-[15px_15px_40px_gray] overflow-y-scroll  w-full h-[98vh] rounded-t-2xl mt-[1%] mr-[1%] flex flex-col items-center px-4 pt-10 my-scrollbar">
      <div className="w-full justify-center flex flex-col items-center mb-10">
        <h1
          style={{ fontFamily: "Josefin, sans-serif" }}
          className="text-[30px] py-5 font-bold bg-gradient-to-b  from-[#01EBEE] to-[#02457A] bg-clip-text text-transparent"
        >
          Explore Your Trashed Items
        </h1>
        <div className="w-180 h-13 relative flex justify-between items-center px-5">
          <IoSearchOutline className="z-2 text-2xl" />
          <IoArrowForward className="z-2 text-2xl" />
          <input
            type="text"
            placeholder="Search deleted items"
            className="px-15 top-0 left-0 w-180 h-full absolute border-1 border-[#258ce0] focus-within:border-2 outline-none rounded-xl shadow-[0_0_10px_0px_rgba(128,128,128,0.3)] bg-white"
          />
        </div>
      </div>
        <h1
          className="text-[23px] font-medium w-full text-black/80 max mb-10"
          style={{ fontFamily: "Unbounded" }}
        >Trash
        <div className="w-18 h-[4px] rounded-2xl bg-[#02457A]"/>
        </h1>
      {
        trash.length > 0 ? 
        <div className="w-full h-max flex flex-wrap gap-6 pb-10">
        {
         trash.map((proj, index) => {
          return (
            <CreatedTrash proj={proj} key={proj.id || index} proTrash={proTrash}  setTryConfirm={setTryConfirm} setDeleteDesign={setDeleteDesign} />
          );
        })
        } 
      </div>
      : 
      <div style={{fontFamily:"Nunito Sans, sans-serif"}} className="w-full h-max items-center justify-center flex flex-col text-center">
        <img src={trashCan} className="w-50" alt="Trash Can" />
        <p className="text-xl font-bold">Any Designs you trash will end up here ♻️</p>
        <p>🗑️ This is your trash. Items here are not gone forever — you can still bring them back <br /> or 🧹 clean them out permanently.</p>
      </div>
      }
    </div>
  )
}

export default MyTrashList