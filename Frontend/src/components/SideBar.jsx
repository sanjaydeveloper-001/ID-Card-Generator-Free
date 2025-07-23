import { MdDeleteOutline } from "react-icons/md";

function SideBar({ creations , handleDeleteCreation }) {

  return (
    <div className='w-80 h-full py-5 flex pl-4 flex-col'>
      <h1 style={{ fontFamily: "Nothing You Could Do ,cursive" }} className="mb-10  text-4xl font-bold ">My Creation</h1>
      <h1 className="text-[#21d1f0]">"Recent designs"</h1>
      <div className="h-max py-5 w-full flex flex-col px-5 gap-2 overflow-y-scroll my-scrollbar">
        {
          creations.length > 0 ?
          creations.map((proj, i)=> {
            return (
              <div key={proj._id || i} className="group h-10 w-50 flex items-center hover:bg-gray-200 rounded-[8px] justify-between px-2 py-1">
                <div className="flex items-center gap-2 overflow-hidden w-full">
                  <img src={proj.profile} className="h-8 aspect-square rounded-xl flex-shrink-0" />
                  <h1 className="truncate text-[15px] max-w-[75%]">{proj.fileName || "Untitled-01"}</h1>
                </div>
                <MdDeleteOutline
                  onClick={() => handleDeleteCreation(proj)}
                  className="text-xl group-hover:opacity-100 opacity-0 cursor-pointer hover:text-red-600 flex-shrink-0"
                />
              </div>
            )
          })  
          :
          <div className="w-full">
            <h1 className="text-[15px] font-medium">No creations found ..!</h1>
          </div>      
        }
      </div>
    </div>
  )
}

export default SideBar