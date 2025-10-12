import formInfo from "../utilities/Form";
import LoadingImg from "../assets/patterns/Loading.gif";
import { useRef, useState } from "react";


function FormInputs({
  setDone,
  fetchLogo,
  formData,
  handleChangeFormDetails,
  handleImageChange,
  handleImageDelete,
  collegeLogo,
  college,
  error,
  setFormData,
  loading,
  regenerate,
  handleCaptureIdCard,
  logoBase64,
  mainLoading,
  setMainLoading
}) {
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (value.trim()) {
      e.target.classList.remove("border-red-500");
    }
    handleChangeFormDetails(e);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setMainLoading(true);
    const form = formRef.current;
    const inputs = form.querySelectorAll("input[required]");
    let allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!formData.profile || !formData.CollegeLogo) {
      if (!formData.profile) document.getElementById("Profile-photo").classList.add("border-red-400");
      if (!formData.CollegeLogo) console.log("Logo not found");
      allFilled = false;
    }
    
    if (allFilled) {
      handleCaptureIdCard();
      setDone(true);
    } else{ setDone(false); setMainLoading(false); }
  };

  return (
    <form ref={formRef} className="w-full flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-5">
        {formInfo.map((info, index) => (
          <div key={index} className="flex flex-col w-full">
            <label htmlFor={info.id} className="text-blue-900 text-sm font-semibold mb-1">
              {info.label} <span className="text-red-500">*</span>
            </label>
            <input
              id={info.id}
              type={info.type}
              value={formData[info.id] || ""}
              onChange={handleInputChange}
              placeholder={info.place}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
              required
              maxLength={60}
            />
          </div>
        ))}
      </div>

      {/* Profile & Logo */}
      <div className="flex flex-col md:flex-row gap-6 mt-2">
        {/* Profile Photo */}
        <div className="w-full md:w-1/2">
          <h1 className="text-blue-900 font-semibold text-sm mb-1">
            Profile Photo <span className="text-red-500">*</span>
          </h1>
          {formData.profile ? (
            <div className="relative">
              <img draggable={false} src={formData.profile} alt="Profile" className="w-full h-52 object-cover rounded-lg shadow-md" />
              <button
                type="button"
                onClick={handleImageDelete}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ) : (
            <label
              id="Profile-photo"
              htmlFor="profile"
              className="flex items-center justify-center h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-600 text-sm">Upload Photo *</span>
              <input
                id="profile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleImageChange(e);
                  document.getElementById("Profile-photo").classList.remove("border-red-400");
                }}
              />
            </label>
          )}
        </div>

        {/* College Logo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
          {collegeLogo || loading ? (
            <>
              <h1 className="text-blue-900 font-semibold text-sm mb-2">College Logo</h1>
              <img
                draggable={false}
                src={loading ? LoadingImg : collegeLogo}
                alt="College Logo"
                className="h-28 object-contain mb-2"
              />
              <div className="flex gap-3">
                <button
                  onClick={regenerate}
                  type="button"
                  className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500 text-sm font-medium"
                >
                  Regenerate
                </button>
                <button
                  onClick={() => {
                    setFormData((p) => ({ ...p, CollegeLogo : logoBase64 }));
                  }}
                  type="button"
                  className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 text-white text-sm font-medium"
                >
                  Fetch
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 text-sm mb-1">Enter your College Name:</p>
              <p id="CollageName" className="text-gray-800 font-semibold text-sm">{college || "Enter College Name"}</p>
              {error && <p className="text-red-500 text-xs mt-1">Enter at least 3 characters</p>}
              <button
                onClick={() => {
                  fetchLogo();
                }}
                type="button"
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-medium"
              >
                Generate Logo
              </button>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        onClick={HandleSubmit}
        disabled={mainLoading}
        className="cursor-pointer w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-md transition"
      >
        {mainLoading ? 'Generating...' : 'Generate ID'}
      </button>
    </form>
  );
}

export default FormInputs;
