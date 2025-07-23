import { IoClose } from "react-icons/io5";
import { AiOutlineUndo } from "react-icons/ai";

function Confirm({ setTryConfirm , handleTrash , deleteDesign }) {
  return (
     <div className="fixed w-full h-[100vh] bg-black/70 flex items-center justify-center z-5">
        
        <div className="relative w-130 h-max bg-gray-100 rounded-2xl flex gap-5 flex-col px-10 py-8">
            <h1 className="absolute -right-10 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 top-0 bg-black rounded-[50%]" onClick={()=> setTryConfirm('')}><IoClose/></h1>
            <div className="flex flex-col mb-5">
              <h1 className="text-xl mb-1">Do you want to move this item to trash?</h1>
              <p>You're here to move <span className="font-bold">{deleteDesign.fileName}</span> to trah?</p>
            </div>
            
            <div className="flex w-full justify-end gap-3">
              <button className="py-1 px-5 border border-gray-400 hover:bg-gray-200 rounded cursor-pointer flex items-center gap-1" 
              onClick={()=>{
                handleTrash(deleteDesign._id , 'Restore')
                setTryConfirm(false);
              }} >
                <AiOutlineUndo className="rotate-90"/> Restore</button>
              <button className="py-1 px-5 rounded bg-red-500 hover:bg-red-500/80 text-white cursor-pointer"
              onClick={()=>{
                handleTrash(deleteDesign._id , 'Delete');
                setTryConfirm(false)
              }}
              >Delete Permanently</button>
            </div>
        </div>
 
      </div>
  )
}

export default Confirm