import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoAlbumsOutline, IoPersonOutline, IoArrowBack, IoCreateOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";

function MyNavBar({ user, setShowProfile }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex flex-row justify-between items-center h-16 w-full py-2 border-b border-gray-400
        sm:flex-col sm:h-[100vh] sm:w-[12vw] sm:max-w-[80px] sm:min-w-[50px] sm:py-5 sm:border-b-0 sm:border-r
      "
    >
      <div className="flex flex-row sm:flex-col w-full sm:w-auto sm:h-max py-0 sm:py-2 gap-4 sm:gap-8 text-xs sm:text-sm md:text-[12px] items-center sm:items-center justify-around sm:justify-start">

        <h1
          className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
          <IoArrowBack className="text-xl sm:text-2xl" />
        </h1>

        <Link
          className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer"
          to="/"
        >
          Home <IoHomeOutline className="text-lg sm:text-xl" />
        </Link>

        <Link
          className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer"
          to="/IDCreation"
        >
          Create <IoCreateOutline className="text-lg sm:text-xl" />
        </Link>

        <Link
          to={'/MyCreations/projects'}
          className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer"
        >
          Projects <IoAlbumsOutline className="text-lg sm:text-xl" />
        </Link>

        <Link
          to={'/MyCreations/trash'}
          className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer"
        >
          Trash <HiOutlineTrash className="text-lg sm:text-xl" />
        </Link>
      </div>

      <div className="w-max h-max py-0 sm:py-2 flex items-center justify-center">
        {!user?.profilePhoto ? (
          <button
            className="flex justify-center items-center border border-gray-300 rounded-full h-9 w-9 hover:bg-gray-200"
            onClick={()=> setShowProfile(true)}
          >
            <IoPersonOutline className="text-xl w-full" />
          </button>
        ) : 
          <img draggable={false} onClick={()=> setShowProfile(true)} src={user?.profilePhoto} className="cursor-pointer h-9 w-9 rounded-full" alt="" />
        }
      </div>
    </div>
  );
}

export default MyNavBar;
