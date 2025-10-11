import { FiEdit2 } from "react-icons/fi";

function CreatedTrash({ proj, setDesign, setMode }) {
  return (
    <div
      onClick={() => { setDesign(proj); setMode('Trash'); }}
      className="
        flex flex-col gap-2
        flex-1 min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[260px] xl:min-w-[280px]
        max-w-[320px]
        bg-white rounded-xl shadow-md hover:shadow-lg shadow-gray-400
        transition-all duration-200 hover:scale-[1.03]
        cursor-pointer overflow-hidden
        p-2
      "
    >
      <div className="relative w-full aspect-[3/4] h-50 border border-gray-300 rounded-md overflow-hidden">
        <img
          src={proj.preview}
          alt="ID preview"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="w-full px-2 py-2 flex flex-col">
        <div className="group flex items-center justify-between gap-1 overflow-hidden">
          <p className="text-[15px] sm:text-[16px] truncate font-medium group-hover:underline">
            {proj.fileName}
          </p>
          <FiEdit2 className="group-hover:opacity-100 opacity-0 text-blue-500 text-[16px] flex-shrink-0 transition-opacity" />
        </div>
        <span className="text-[13px] sm:text-[14px] text-[#d74fa3] mt-1 text-right">
          {proj.createdDate}
        </span>
      </div>
    </div>
  );
}

export default CreatedTrash;
