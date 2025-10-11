import { FiEdit2 } from "react-icons/fi";

function CreatedCard({ proj, setDesign, setMode }) {
  return (
    <div
      onClick={() => {setDesign(proj); setMode('Creation')}}
      className="
        flex flex-col gap-2
        bg-[#01EBEE]/5 rounded-xl shadow-md hover:shadow-lg
        transition-all duration-200 hover:scale-[1.03]
        cursor-pointer overflow-hidden
        flex-1 min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[260px]
        max-w-[320px]
        shadow-gray-400
        p-2
      "
    >
      <div className="relative w-full aspect-[3/4] h-50 border rounded-md border-gray-300">
        <img
          src={proj.preview}
          alt="ID preview"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="w-full px-3 py-2 flex flex-col">
        <div className="flex items-center justify-between gap-1 overflow-hidden">
          <p className="text-[15px] sm:text-[16px] truncate font-medium">
            {proj.fileName}
          </p>
          <p className="text-[13px] sm:text-[14px] text-[#d74fa3]">
            {proj.createdDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreatedCard;
