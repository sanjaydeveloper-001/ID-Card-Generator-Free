import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { FiDownload, FiEdit, FiSave } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import confetti from "../assets/patterns/Confetti.json";
import { addCreation, fetchCreations } from "../api/api";

function DisplayID({
  setDone,
  setFormData,
  formData,
  token,
  user,
  setCreations,
}) {
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [completed, setComplete] = useState(false);
  const [IDname, setIDname] = useState("Untitled");
  const lottieRef = useRef();
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (lottieRef.current) lottieRef.current.setSpeed(1.2);
  }, []);

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = formData.preview;
    link.download = `${IDname || "Untitled-01"}.png`;
    link.click();
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  const HandleShowSave = async () => {
    if(IDname.length < 3){
      setIDname("Type atleast 3 char");
      return;
    }
    setFormData((p) => ({
      ...p,
      fileName: IDname,
      createdDate: formattedDate,
    }));
    if (!user){
        localStorage.setItem('tempsaved',formData);
        return navigate("/Login");
    }
    setIsSaving(true);
    try {
      await addCreation(formData, token);
      setSaved(true);
      const updated = await fetchCreations(token);
      setCreations(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
      setDone(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 sm:p-4 p-2">
      <div
        className="
      bg-white 
      rounded-3xl shadow-2xl 
      p-6 sm:p-10 
      w-full sm:w-4/5 lg:w-3/5 
      h-max 
      overflow-y-auto 
      relative 
      flex flex-col items-center 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
    "
      >
        <div className="absolute top-4 right-4 flex gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          {user && (
            <Link
              to="/MyCreations"
              className="text-gray-700 hover:text-blue-500"
            >
              My Creations
            </Link>
          )}
          <IoExitOutline
            onClick={() => setDone(false)}
            className="text-gray-700 hover:text-red-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center text-center mt-4 relative">
          <Lottie
            lottieRef={lottieRef}
            autoPlay
            loop={false}
            animationData={confetti}
            onComplete={() => setComplete(true)}
            className="w-full h-full sm:w-40 sm:h-40 absolute"
            style={{ display: completed ? "none" : "block" }}
          />
          <h2 className="text-green-600 text-2xl sm:text-3xl font-bold mt-2">
            Yes! You did it 🎉
          </h2>
          <p className="text-gray-600 mt-1 mb-4">
            Your ID is ready. Save or download below:
          </p>

          <div className="w-full flex justify-center mt-2 mb-6 gap-3 sm:gap-6">
            <img
              draggable={false}
              src={formData.preview}
              alt="Preview"
              className="
            w-auto
            h-50
            sm:h-80
            rounded-xl 
            sm:shadow-lg shadow-sm
            shadow-gray-500 
            border border-gray-200 
            object-contain 
            transition-transform duration-300 hover:scale-[1.02]
          "
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:justify-center">
            <input
              type="text"
              value={IDname}
              autoFocus={true}
              onChange={(e) => {
                setIDname(e.target.value);
                setSaved(false);
              }}
              className={`border ${IDname == "Type atleast 3 char" ? 'text-red-500' : ''} border-gray-300  py sm:px-3 py-2 rounded-md w-full sm:w-48 text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
            />

            <button
              onClick={handleDownload}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white  py px-4 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <FiDownload /> Download
            </button>

            {saved ? (
              <button
                disabled
                className=" bg-green-500 text-white  py px-4 py-2 rounded-md cursor-not-allowed"
              >
                Saved
              </button>
            ) : (
              <button
                onClick={HandleShowSave}
                className={`cursor-pointer py px-4 py-2 rounded-md text-white flex items-center justify-center gap-2 ${
                  isSaving ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <FiSave /> Save
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => setDone(false)}
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <FiEdit /> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayID;
