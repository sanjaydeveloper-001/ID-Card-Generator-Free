// ProfileBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddAPhoto, MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import photo from "../assets/profileImg.jpg";
import { updatProfile, removeProfilePhoto } from "../api/api";

function ProfileBar({ user, setUser, setShowProfile, token }) {
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addProfile = async (data) => {
    setUser((prevUser) => ({ ...prevUser, profilePhoto: data }));
    try {
      await updatProfile(data, token);
      setImg(null);
      setShowProfile(false);
    } catch (error) {
      console.error(error);
    }
  };

  const removeProfPhoto = async () => {
    setUser((prevUser) => ({ ...prevUser, profilePhoto: null }));
    try {
      await removeProfilePhoto(token);
      setShowProfile(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
    setShowProfile(false);
  };

  const profilePhoto = img || user?.profilePhoto;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden relative transform scale-100 md:scale-100 transition-all">

        {/* Close Button */}
        <IoClose
          onClick={() => setShowProfile(false)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl text-gray-500 hover:text-gray-900 cursor-pointer transition"
        />

        {/* Left Panel: Profile Picture */}
        <div className="md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-8 gap-4 sm:gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden hover:scale-105 transition">
            <img
              draggable={false}
              src={profilePhoto || photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-3 sm:mt-4">
            {!user?.profilePhoto && img && (
              <button
                onClick={() => addProfile(img)}
                className="flex items-center gap-1 sm:gap-2 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-green-600 shadow-md transition text-sm sm:text-base"
              >
                Set <IoMdCheckmarkCircleOutline />
              </button>
            )}

            <label
              htmlFor="image"
              className="flex items-center gap-1 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-100 cursor-pointer shadow-sm transition text-sm sm:text-base"
            >
              { user?.profilePhoto ? 'Change' : 'Add' }
              <MdAddAPhoto />
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />

            {(profilePhoto || img) && (
              <button
                onClick={() => (img ? setImg(null) : removeProfPhoto())}
                className="flex items-center gap-1 sm:gap-2 bg-red-100 text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-red-200 shadow-sm transition text-sm sm:text-base"
              >
                Delete <MdDeleteOutline />
              </button>
            )}
          </div>
        </div>

        {/* Right Panel: Profile Info */}
        <div className="md:flex-1 p-6 sm:p-8 flex flex-col justify-between gap-4 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 text-center md:text-left">My Profile</h2>

          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="w-full sm:w-32 text-gray-500 font-medium text-sm sm:text-base">Full Name</span>
              <div className="flex-1 bg-gray-100 px-3 sm:px-4 py-2 rounded-xl shadow-sm text-sm sm:text-base">
                {user?.firstname} {user?.lastname}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="w-full sm:w-32 text-gray-500 font-medium text-sm sm:text-base">Email</span>
              <div className="flex-1 bg-gray-100 px-3 sm:px-4 py-2 rounded-xl shadow-sm text-sm sm:text-base">
                {user?.email}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="w-full sm:w-32 text-gray-500 font-medium text-sm sm:text-base">Password</span>
              <input
                type="password"
                value="********"
                readOnly
                className="flex-1 bg-gray-100 px-3 sm:px-4 py-2 rounded-xl shadow-sm cursor-not-allowed focus:outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-md transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
