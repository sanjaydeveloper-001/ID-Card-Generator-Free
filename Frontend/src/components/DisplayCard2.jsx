import { IoClose } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";

function DisplayCard2({
  design,
  mode,
  setDesign,
  handleDeleteCreation,
  setDeleteDesign,
  setTryConfirm,
}) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = design.preview;
    link.download = design.fileName;
    link.click();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setDesign("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-[1px] p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-[90%] sm:w-[80%] md:w-[70%] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-transform duration-300"
      >
        <button
          onClick={() => setDesign("")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl p-1 rounded-full bg-white cursor-pointer transition-colors shadow-gray-400 shadow-sm"
        >
          <IoClose />
        </button>
        <div className="flex-1 bg-gray-50 p-4 sm:p-6 flex justify-center items-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-gray-200">
          <img
            draggable={false}
            src={design.preview}
            alt="Preview"
            className="w-full max-w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] rounded-lg object-contain shadow-lg transition-shadow hover:shadow-2xl"
          />
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-1 truncate">
              {design.fileName}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Created on: {design.createdDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md md:rounded-xl py-2 sm:py-3 shadow-md cursor-pointer transition-all duration-300"
            >
              <LuDownload className="text-lg" /> Download
            </button>
            <button
              onClick={() => {
                if (mode === "Creation") {
                  setDesign("");
                  handleDeleteCreation(design);
                } else {
                  setDesign("");
                  setTryConfirm(true);
                  setDeleteDesign(design);
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-md md:rounded-xl py-2 sm:py-3 shadow-md cursor-pointer transition-all duration-300"
            >
              {mode == "Creation" ? "Delete" : "Restore / Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard2;
