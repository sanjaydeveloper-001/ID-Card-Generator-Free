import { IoClose } from "react-icons/io5";
import { AiOutlineUndo } from "react-icons/ai";

function Confirm({ deleteDesign, setTryConfirm, handleTrash }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2">
      <div className="bg-gray-100 rounded-2xl max-w-md w-full p-6 flex flex-col gap-4 relative">
        <h1
          onClick={() => setTryConfirm(false)}
          className="absolute top-2 right-2 p-1 bg-black rounded-full text-gray-200 hover:text-white cursor-pointer"
        >
          <IoClose />
        </h1>
        <h1 className="text-xl font-bold">Do you want to move this item to trash?</h1>
        <p>
          You're here to move <span className="font-bold">{deleteDesign.fileName}</span> to trash?
        </p>
        <div className="flex justify-end gap-3 flex-wrap">
          <button
            onClick={() => { handleTrash(deleteDesign._id, "Restore"); setTryConfirm(false); }}
            className="flex items-center gap-1 py-1 px-4 border rounded hover:bg-gray-200"
          >
            <AiOutlineUndo className="rotate-90" /> Restore
          </button>
          <button
            onClick={() => { handleTrash(deleteDesign._id, "Delete"); setTryConfirm(false); }}
            className="py-1 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
