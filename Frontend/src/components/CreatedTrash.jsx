import React from 'react'
import { FiEdit2 } from 'react-icons/fi'

function CreatedTrash({ proj , setTryConfirm , setDeleteDesign }) {
  return (
    <div className="flex-1 min-w-[250px] max-w-[300px] h-50 flex flex-col gap-2" onClick={()=> {setTryConfirm(true); setDeleteDesign(proj)}}>
            <img
                src={proj.preview}
                className="rounded-[5px] h-[85%] shadow-[2px_2px_10px_gray] hover:scale-105 transition-all duration-150 hover:shadow-[5px_5px_10px_gray] cursor-pointer"
                alt="ID preview"
            />
    
            <div className="w-full flex items-center">
              <div className="group w-[70%] flex items-center gap-1 overflow-hidden cursor-pointer">
                <p className="text-[17px] truncate max-w-full group-hover:underline">
                  {proj.fileName}
                </p>
                <FiEdit2
                  className="group-hover:opacity-100 opacity-0 text-blue-500 text-[18px] flex-shrink-0 "
                />
              </div>
              <span className=" text-[#d74fa3] w-[30%] flex justify-end">{proj.createdDate}</span>
            </div>
       </div>
  )
}

export default CreatedTrash