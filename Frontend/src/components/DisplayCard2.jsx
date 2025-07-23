import { IoClose } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { IoIosStarOutline , IoIosStar } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";

function DisplayCard2( {design , setDesign , handleDeleteCreation }) {

    const handleDownload = () =>{
    const link = document.createElement('a');
    link.href = design.preview;
    link.download = design.fileName;
    link.click();
  }

    console.log(design);
  return (
    <div className='fixed top-0 right-0 w-full h-[100vh] bg-black/70 z-5 flex justify-center items-center'>
        <div className=' w-max h-130 bg-white rounded-2xl relative flex'>
            <h1 onClick={() => setDesign('')} className="absolute -right-10 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 bg-black rounded-[50%]" ><IoClose/></h1>
            <div className="w-max h-full bg-gray-200 rounded-l-2xl p-5 flex justify-center items-center relative">
                <h1 className="w-10 h-10 border-1 absolute top-2 right-2 text-xl items-center justify-center flex rounded-[5px] cursor-pointer hover:bg-gray-300 bg-blue-100"><FiEdit2/></h1>
                <img src={design.preview} className="h-100 rounded-xl w-max flex-shrink-1" alt="" />
            </div>
            <div className="w-[300px] h-full rounded-r-2xl p-5 flex flex-col">
                <h1 className="text-3xl font-bold mb-1">{design.fileName}</h1>
                <p className="mb-10">Created on : {design.createdDate}</p>
               
                <div className="w-full flex items-center justify-between">
                    <h1 className="h-10 w-full bg-blue-400 text-[18px] flex justify-center items-center gap-2 rounded-[5px] text-white hover:bg-blue-500 cursor-pointer" onClick={handleDownload}><LuDownload/> Download</h1>
                    <h1 className="h-10 w-max px-2 border-1 items-center justify-center flex text-[15px] rounded-[5px] flex-shrink-0 ml-1 hover:bg-gray-200 cursor-pointer" onClick={()=> handleDeleteCreation(design)}>Delete</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DisplayCard2